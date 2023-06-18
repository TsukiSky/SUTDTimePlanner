# SUTDTimePlanner

![SUTD Time Planner](.\SUTDTimePlannerFrontend\src\assets\logo.png)

The SUTD Time Planner is a web application designed to help SUTD students search for courses and arrange their course schedules efficiently before the semester starts.

## Features

* **Course Search:** Students can search for available courses based on various criteria such as course name, term or pillar.
* **Schedule Visualization:** Students are able to visualize their course schedules on the website.
* **Conflict Detection:** The website automatically detects and highlights students about any time conflicts that may arise when selecting multiple courses. Therefore, students can adjust their plan accordingly to avoid any potential tragedy on myportal when the actual enrollment day comes.

## Technologies Used

* **Frontend:** The frontend of the website is built with Angular and Ng-zorro, an angular UI component library.
* **Backend:** The backend is implemented using JAVA Spring, which handle the server-side logic and API integrations. The developer was so stupid that he did not put the database on Firebase when the project just started, so now he has to consider the server side issue. He is so poor that cannot handle the price of a server as well as a domain name.
* **Data Retrieval:** A proper data retrieval method hasn't been found. If you have an idea, feel free to implement it and pull a request.

## Installation

1. Clone the repository: `git clone git@github.com:TsukiSky/SUTDTimePlanner.git`
2. Enter the frontend directory `SUTDTimePlanner/SUTDTimePlannerFrontend`
3. Install the required dependencies: `npm install`
4. Start the server: `npm start`
5. If you want to check the backend as well, enter the backend directory `SUTDTimePlanner/SUTDTimePlannerBacktend` and compile the code using JAVA 17. Note that you have to set up a local database connection manually, a sample dataset can be found [here](/SUTDTimePlannerBackend/sample_data.json)  in json format.
6. Open the website in your browser at `http://localhost:4200/`

## Contribution Guidelines

Contributions to the website are very welcome. If you'd like to contribute, please follow these guidelines:

1. Fork the repository and create a new branch for your feature or bug fix.
2. Test your changes thoroughly and provide appropriate documentation.
3. Submit a pull request with a clear description of your changes and their purpose.

## License

The SUTD Time Planner is released under the MIT License.

## Contact Information

If you have any questions, suggestions, or excellent ideas on the course information retrieval, feel free to put a comment under Issues, or you can contact the project developer via email: siqi_xiang@mymail.sutd.edu.sg.
