import requests
from bs4 import BeautifulSoup
import pandas as pd

def scrape_course_info(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    # Extract information
    course_description = soup.find('h4', text='Course Description').find_next('p').text.strip()
    prerequisites = [li.text.strip() for li in soup.find('h4', text='Prerequisites').find_next('ul').find_all('li')]
    instructors = [a.text.strip() for a in soup.find('h4', text='Course Instructor(s)').find_next('p').find_all('a')]

    return course_description, prerequisites, instructors

# Read data from the CSV file
df = pd.read_csv('istd_term.csv')

# Create new columns for description, prerequisites, and instructors
df['Description'] = ''
df['Prerequisites'] = ''
df['Instructors'] = ''

# Update the DataFrame with information from each course URL
for index, row in df.iterrows():
    url = row['Course URL']
    description, prerequisites, instructors = scrape_course_info(url)

    df.at[index, 'Description'] = description
    df.at[index, 'Prerequisites'] = ', '.join(prerequisites)
    df.at[index, 'Instructors'] = ', '.join(instructors)

# Save the updated DataFrame to a new CSV
df.to_csv('updated_istd_term.csv', index=False)

print(f'Successfully added information and saved data to updated_istd_term.csv')
