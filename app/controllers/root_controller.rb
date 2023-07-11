class RootController < ApplicationController
    def index
        render file: 'client/public/index.html'
      end
end
