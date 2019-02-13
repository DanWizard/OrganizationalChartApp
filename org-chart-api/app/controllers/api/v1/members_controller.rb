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
			@all.each do |e|
				if e.manager_id == num
					Member.find(e.id).update(manager_id: nil)
				end
			end
			if @member.destroy
				head :no_content, status: :ok
			else
				render json: @member.errors, status: :unprocessible_entity
			end
		end

		def root
			data = Member.all
			root = ''
			data.each do |e|
				if e.manager_id == nil
					root = e 
				end
			end
			return root
		end

		def structureTree(manager)
			@subordinates = Member.find(manager.id).subordinates
			if @subordinates.length < 1
				treeObj = {name: manager.name}
				return treeObj
			else
				treeObj = {name: manager.name, children: []}
				@subordinates.each{ |e| treeObj[:children] << structureTree(e) }
				return treeObj 
			end
		end

		def tree
			root_member = root()
			@subordinates = structureTree(root_member)
			render json: @subordinates
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
