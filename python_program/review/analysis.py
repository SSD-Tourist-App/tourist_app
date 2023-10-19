import json
import os

file_path = os.path.join(".", "reviews.json")

with open(file_path, "r") as json_file:
    data = json.load(json_file)

average_ratings = {}
liked_disliked = {}
categories = {
    "Historical Sites": [],
    "Natural Wonders": [],
    "Cultural Landmarks": []
}
visitors_categories = {
    "Adventure Seeker": [],
    "Family": [],
    "History Enthusiasts": []
}

for location, attributes in data.items():
    attractions_facilities = attributes.get("Attractions and Facilities", 0)
    visitor_services = attributes.get("Visitor Services", 0)
    value_for_money = attributes.get("Value for Money", 0)
    overall_experience = attributes.get("Overall Experience", 0)
    revisit = attributes.get("Would Visit Again", None)
    
    average_rating = (attractions_facilities + visitor_services + value_for_money + overall_experience)

    if revisit.lower() == "yes":
        average_rating += 5
    average_rating /= 5
    average_ratings[location] = average_rating

    if average_rating >= 4:
        liked_disliked[location] = "Liked"
    else:
        liked_disliked[location] = "Disliked"

    attraction_type = attributes.get("Type of Attraction", "Other")
    categories[attraction_type].append(location)

    attraction_type = attributes.get("Type of Visitors", "Other")
    visitors_categories[attraction_type].append(location)


print("Average Ratings for Each Location Over 5.0:")
for location, rating in average_ratings.items():
    print(f"{location}: {rating:.2f}")

print("\nLiked or Disliked Locations:")
for location, opinion in liked_disliked.items():
    print(f"{location}: {opinion}")

print("\nCategorized Locations Based on Attraction:")
for category, locations in categories.items():
    print(f"{category} Locations: {', '.join(locations)}")

print("\nCategorized Locations Based on Visitors:")
for category, locations in visitors_categories.items():
    print(f"{category} Locations: {', '.join(locations)}")
