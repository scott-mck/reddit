class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :title, null: false
      t.string :picture_url
      t.string :link_url
      t.string :description
      t.integer :votes, null: false, default: 0

      t.timestamps null: false
    end
  end
end
