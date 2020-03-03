Rails.application.routes.draw do
  root 'pages#index'

  %w[404 422 500].each do |code|
    get code, to: 'errors#show', code: code
  end

  get '*path', to: 'courses#index', constraints: { path: 'programs' }
  get '*path', to: 'courses#show', constraints: { path: %r{programs/.*} }

  get '*path', to: 'pages#history', constraints: { path: 'about/history' }

  get '*path', to: 'tutors#index', constraints: { path: 'tutors' }
  get 'tutors/:id', to: 'tutors#show'
  get 'sveden/employees', to: redirect('/tutors')

  get '*path', to: 'docs#index', constraints: { path: 'sveden/document' }

  get :announces, to: 'pages#announces'

  get :search, to: 'search#index'

  scope '(:locale)', locale: /en/ do
    get '', to: 'pages#index'

    get 'index', to: 'pages#index', constraints: lambda { |request|
      request.format == :json
    }, format: :json

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
