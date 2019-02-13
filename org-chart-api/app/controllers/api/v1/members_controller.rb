module Api::V1
	class MembersController < ApplicationController
		# before_action :set_member, only: [:show, :update, :destroy]
		protect_from_forgery with: :null_session

		#GET /api/v1/members
		def index
			@members = Member.order("created_at DESC")
			render json: @members
		end

		#POST /api/v1/members
		def create
			@member = Member.create(member_params)
			render json: @member
		end

		#GET /api/v1/members/:id
		def show
			@member = Member.find(params[:id])
			render json: @member
		end

		#GET /api/v1/members/:id/children
		def children
			@members = Member.find(params[:id]).subordinates
			render json: @members
		end

		def manager
			@member = Member.find(params[:id]).manager
			render json: @member
		end
			
		#PATCH/PUT /api/v1/members:id
		def update
			p "update"
			p "update"
			p "update"
			p "update"
			p "update"
			p "update"
			# @member = Member.find(params[:id]).update(name: params[:name], title: params[:title], manager_id: params[:manager_id])
			@member = Member.find(params[:id])
			@member.update(member_params)
			render json: @member
		end

		#DELETE /api/v1/members
		def destroy
			@member = Member.find(params[:id])
			@all = Member.all
			id = params[:id]
			num = id.to_i
			p id
			p num
			p @all
			@all.each do |e|
				p"yo"
				p"yo"
				p"yo"
				p"yo"
				if e.manager_id == num
					p 'searching'
					p 'searching'
					p 'searching'
					p 'searching'
					p 'searching'
					Member.find(e.id).update(manager_id: nil)
					
				end
			end
			if @member.destroy
				head :no_content, status: :ok
			else
				render json @member.errors, status: :unprocessible_entity
			end
		end


		private
		# Use callbacks to share common setup or constraints between actions.
			def set_member
				@member = Member.find(params[:id])
			end
		# Never trust parameters from the scary internet, only allow the white list through.
			def member_params
				params.require(:member).permit(:name, :title, :manager_id)
			end
		
	end
end
