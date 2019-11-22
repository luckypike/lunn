Rails.application.routes.draw do
  root 'pages#index'

  get '*path', to: 'pages#history', constraints: { path: 'sveden/history' }

  get '*path', to: 'pages#show', constraints: ->(request) { UrlAlias.where(alias: request[:path]).any? }
end
