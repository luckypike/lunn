Rails.application.routes.draw do
  root 'pages#index'

  %w[404 422 500].each do |code|
    get code, to: 'errors#show', code: code
  end

  devise_for(
    :users,
    only: %i[sessions confirmations],
    controllers: {:confirmations => "confirmations"},
    path: '',
    path_names: {
      sign_in: :login,
      sign_out: :logout
    }
  )

  as :user do
    get :join, to: 'devise/registrations#new', as: :new_user_registration
    post :join, to: 'devise/registrations#create', as: :user_registration
    get :recovery, to: 'devise/passwords#new', as: :new_user_password
    post :recovery, to: 'devise/passwords#create', as: :user_password
    put :recovery, to: 'devise/passwords#update', as: :user_password_update
    get :change, to: 'devise/passwords#edit', as: :edit_user_password
  end

  get '*path', to: 'courses#index', constraints: { path: 'programs' }
  get '*path', to: 'courses#show', constraints: { path: %r{programs/.*} }

  get '*path', to: 'pages#history', constraints: { path: 'about/history' }
  get '*path', to: 'admissions#page', constraints: { path: 'abitur/online' }

  get '*path', to: 'tutors#index', constraints: { path: 'tutors' }
  get 'tutors/:id', to: 'tutors#show'
  get 'sveden/employees', to: redirect('/tutors')

  get 'abitur/programs', to: 'divisions#index'

  get '*path', to: 'docs#index', constraints: { path: 'sveden/document' }

  get :announces, to: 'pages#announces'

  get :search, to: 'search#index'

  scope '(:locale)', locale: /en/ do
    get '', to: 'pages#index'

    get 'index', to: 'pages#index', constraints: lambda { |request|
      request.format == :json
    }, format: :json

    resources :admissions, only: %i[index new create show]

    resources :news, only: %i[index show]

    resources :events, only: %i[index show]

    get 'send-mail', to: 'feedback#index'
    post 'send-mail', to: 'feedback#create'

    get :contacts, to: 'pages#contacts'

    get '*path', to: 'pages#show', constraints: lambda { |params, _request|
      UrlAlias.lang(params[:locale]).where(alias: params[:path]).any?
    }
  end
end
