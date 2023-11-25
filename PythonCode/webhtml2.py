from pathlib import Path

# Search for Chrome profile directory
chrome_profile_directory = Path("/home/render/.config/google-chrome/Profile 1")

if chrome_profile_directory.exists():
    print("Chrome profile directory found:", chrome_profile_directory)
else:
    print("Chrome profile directory not found.")
