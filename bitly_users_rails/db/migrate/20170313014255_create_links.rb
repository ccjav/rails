class CreateLinks < ActiveRecord::Migration[5.0]
  def change
    create_table :links do |t|
      t.string :original_link
      t.string :new_link
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
