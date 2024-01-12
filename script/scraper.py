import requests
from bs4 import BeautifulSoup
import csv

# Function to scrape course information
def scrape_sutd_course_schedule(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    # Find all the terms
    term_elements = soup.select('.fusion-title.title h3.title-heading-left')

    # Store data in a list of dictionaries
    data = []

    for term_element in term_elements:
        term_number = term_element.text.strip().replace('Term ', '')

        # Find all courses within the current term
        courses = term_element.find_next('div', class_='fusion-blog-shortcode').find_all('article')

        for course in courses:
            course_title = course.select_one('.blog-shortcode-post-title a').text.strip()
            course_url = course.select_one('.blog-shortcode-post-title a')['href']

            data.append({
                'Term': term_number,
                'Course Title': course_title,
                'Course URL': course_url,
            })

    return data

if __name__ == "__main__":
    # Replace 'your_url_here' with the actual URL of the SUTD course schedule page
    url = 'https://istd.sutd.edu.sg/education/undergraduate/course-schedule/'
    data = scrape_sutd_course_schedule(url)

    # Replace 'istd_term.csv' with your desired CSV file name
    csv_filename = 'istd_term.csv'

    # Write data to CSV
    with open(csv_filename, 'w', newline='') as csvfile:
        fieldnames = ['Course Title', 'Term', 'Course URL']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

        writer.writeheader()

        for entry in data:
            writer.writerow({
                'Course Title': entry['Course Title'],
                'Term': entry['Term'],
                'Course URL': entry['Course URL'],
            })

    print(f'Successfully scraped and saved data to {csv_filename}')
