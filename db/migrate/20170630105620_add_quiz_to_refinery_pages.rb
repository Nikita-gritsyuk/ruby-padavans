class AddQuizToRefineryPages < ActiveRecord::Migration
  def change
    add_column :refinery_pages, :quiz_json, :text, default: '[{"Question": "What is Unix?", "Answers": {"a": "Text editor", "b": "Linux-based operational system", "c": "Rails plugin", "d": "OS standart"}, "Answer": "d"}]'
  end
end
