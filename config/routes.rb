Rails.application.routes.draw do
  root 'pages#index'

  get 'index', to: 'pages#index', constraints: ->(req) { req.format == :json }, format: :json

  resources :news, only: %i[index show]

  resources :events, only: %i[index show]

  get '*path', to: 'pages#history', constraints: { path: 'about/history' }

  get '*path', to: 'courses#index', constraints: { path: 'programs' }
  get '*path', to: 'courses#show', constraints: { path: %r{programs/.*} }

  get '*path', to: 'pages#show', constraints: ->(request) { UrlAlias.where(alias: request[:path]).any? }
end
