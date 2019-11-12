Rails.application.routes.draw do
  root 'payroll#home'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :payroll, only: [:index, :show, :create, :new, :home]
  get 'report/ids', to: 'report#ids'
  resources :report, only: [:index, :show]
end
