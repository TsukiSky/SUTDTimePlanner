# SUTD Time Planner Website Design

## I. Requirement

### 1. Purpose

The purpose of the SUTD Time Planner is to assist SUTD students in searching for courses and efficiently arranging their course schedules before the semester begins. The website aims to provide a user-friendly interface and essential features to simplify the course planning process.

### 2. Key Features

* Course Search: Allow students to search for available courses based on criteria such as course name, term and pillar.
* Schedule Visualization: Enable students to visualize their course schedules through a timetable.
* Conflict Detection: Automatically detect and highlight any time conflicts that may arise when selecting multiple courses.
* Timetable Downloads: Provide the option for students to download their course schedules in .jpg format.

### 3. User Requirements

Based on personal experience and some feedbacks from students. the following requirements are raised.

* Students should be able to easily search for courses and view course details.
* The schedule visualization should be clear and easy to understand, allowing students to comprehend their course timetable at a glance.
* The website should quicky identify and notify students of any potential time conflicts when selecting courses.
* Timetable downloads should be accessible and compatible with common file formats for ease of use as wallpapers.

## II. Analysis

* Target audience of this website: SUTD undergraduate students from all pillars.
* Any specific requirements or preferences expressed by the users during the development process should be considered.
* Some course planning tools from other universities have been analyzed for learning purposes. Some outstanding samples include: 
  * Time planner from Hong Kong University of Science and Technology: https://coust.github.io/
  * NUSMODS from National University of Singapore: https://nusmods.com/timetable/sem-2

* Analyze the existing course data structure and determine the necessary fields and attributes required for the website's functionalities.
* Evaluate the feasibility of integrating with external systems or databases for accessing official course data.

## III. Design

### 1. User Interface Design

* Design an visually appealing user interface that aligns with SUTD's branding.
* Organize the course search function and schedule visualization in a user-friendly manner, prioritizing readability and ease of understanding.

## 2. Database Design

* Implement appropriate indexing and optimization techniques to ensure efficient data retrieval and storage.
* Define the relationships between different entities such as courses, lecturers, and class slots.

## IV. Implementation

### 1. Front-end Development

* The frontend of the website is developed with Angular and Ng-zorro, an angular UI component library to maintain the interface consistency.

### 2. Back-end Development

* The backend is implemented using JAVA Spring, which handle the server-side logic and API integrations.

## V. Testing (haven't done)

### 1. Unit Testing

* Conduct unit tests to ensure the correctness and functionality of individual components and functions.
* User Selenium for automated testing.

### 2. Integration Testing

* Perform integration tests starting from the front-end to verify the interactions and compatibility between components, APIs and modules.