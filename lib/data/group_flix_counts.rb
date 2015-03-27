require 'json'
require 'pry'

DATA_SET_KEYS = ['cdn', 'usa', 'shared']

data_set_jsons = DATA_SET_KEYS.map do |key|
  file = File.read("#{key}_flix_count_by_year.json")
  json = JSON.parse(file).reverse
  {name: key, json: json }
end

data_set_jsons.each do |set|
  sum_counts = Proc.new {|m, datum| m + datum['y']}

  recent_years_data = set[:json][0, 16]
  File.open("#{set[:name]}_recent_flix_count.json","w") do |f|
    f.write(recent_years_data.to_json)
  end

  decades = (1910..1990).step(10).to_a.reverse
  back_catalogue = decades.map do |decade|
    decade_str = "#{decade.to_s[2, 2]}s"
    years = decade..(decade + 9)

    decade_set = set[:json].find_all{|datum| years.include? datum['x'].to_i }
    decade_total = decade_set.reduce(0, &(sum_counts))
    {'x' => decade_str, 'y' => decade_total}
  end

  File.open("#{set[:name]}_back_catalogue_count.json","w") do |f|
    f.write(back_catalogue.to_json)
  end

  recent_total = recent_years_data.reduce(0, &(sum_counts))
  back_catalogue_total = back_catalogue.reduce(0, &(sum_counts))
  total_total = recent_total + back_catalogue_total
  totals = [
    {'x' => 'recent_flix', 'y' => recent_total},
    {'x' => 'back_catalogue_flix', 'y' => back_catalogue_total},
    {'x' => 'all', 'y' => total_total}
  ]

  File.open("#{set[:name]}_count_totals.json","w") do |f|
    f.write(totals.to_json)
  end

end