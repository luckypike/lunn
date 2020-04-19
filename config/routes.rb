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

  # get '*path', to: 'courses#index', constraints: { path: 'programs' }
  get 'programs', to: redirect('/programs/ba')
  get '*path/:level', to: 'courses#index', constraints: { path: 'programs', level: %w[ba sp ma as] }
  get '*path/:id', to: 'courses#show', constraints: { path: 'programs', id: /\d.+/ }
  get '*path', to: 'courses#ugsn', constraints: { path: 'programs/ugsn' }

  get '*path', to: 'pages#history', constraints: { path: 'about/history' }
  get '*path', to: 'admissions#page', constraints: { path: 'abitur/online' }

  # Abiturs
  get '*path', to: 'pages#abitur', constraints: { path: 'abitur/2020' }

  get '*path', to: 'tutors#index', constraints: { path: 'tutors' }
  get '*path/:id', to: 'tutors#show', constraints: { path: 'tutors', id: /\d.+/ }
  get 'sveden/employees', to: redirect('/tutors')

  get '*path', to: 'docs#index', constraints: { path: 'sveden/document' }

  get :announces, to: 'pages#announces'

  get :search, to: 'search#index'

  scope '(:locale)', locale: /en/ do
    get '', to: 'pages#index'

    get 'index', to: 'pages#index', constraints: lambda { |request|
      request.format == :json
    }, format: :json

    resources :admissions, only: %i[index new create show]

    resources :invoices, only: %i[index create] do
      collection do
        post :pay
        get :payed
      end

      member do
        post :approve
      end
    end

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
