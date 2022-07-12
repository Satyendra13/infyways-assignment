import sys
from instaloader import Instaloader, Profile
from decouple import config
target_profile = sys.argv[1]
username = "satyendra_13"
password = sys.argv[2]
loader = Instaloader()
loader.login(username, password)
profile = Profile.from_username(loader.context, target_profile)
num_followers = profile.followers
total_num_likes = 0
total_num_comments = 0
total_num_posts = 0
for post in profile.get_posts():
    total_num_likes += post.likes
    total_num_comments += post.comments
    total_num_posts += 1


print(num_followers)
print(total_num_posts)
print(total_num_comments)
print(total_num_likes)
engagement = float(total_num_likes + total_num_comments) / (num_followers * total_num_posts)
print(round((engagement * 100), 2))
sys.stdout.flush()