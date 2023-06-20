class RootController < ApplicationController
    def index
        render file: Rails.root.join("client", "public", "index.html")
      end
end
