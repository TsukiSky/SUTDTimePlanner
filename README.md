# SUTDTimePlanner

![SUTD Time Planner](./SUTDTimePlannerFrontend/src/assets/logo.png)

**SUTD Time Planner** is a web application designed to help SUTD students search for courses and schedule courses efficiently before the semester starts.

## Features

* **Course Search:** Students can search for available courses based on various criteria, such as course name, term and pillar.
* **Timetable and Scheduling Visualization:** Students are able to visualize their course schedules on the website. Timetable wallpapers with different resolutions are available for download.
* **Course Conflict Detection:** The website automatically detects and highlights time conflicts that may arise when selecting courses.

## Technologies Used

* **Frontend:** Developed using Angular and the NG-ZORRO UI library.
* **Backend:** Built in Java, with APIs for updating the course database.
* **Data Retrieval:** The courses' information is retrieved from the SUTD official website.

## Getting Started

1. Clone the repository: `git clone git@github.com:TsukiSky/SUTDTimePlanner.git`
2. Navigate to the frontend directory: `SUTDTimePlanner/SUTDTimePlannerFrontend`
3. Install dependencies: `npm install`
4. Launch the server: `npm start`
5. For backend setup, move to `SUTDTimePlanner/SUTDTimePlannerBackend` and compile with Java 17. Ensure you have a local database connection. A sample dataset can be found [here](/SUTDTimePlannerBackend/sample_data.json)  in json format.
6. Access the application at `http://localhost:4200/`

## Contribution Guidelines

Contributions to the website are very welcome. To contribute:

1. Clone this repository and implement your changes.
2. Test your changes and provide appropriate documentation.
3. Submit a pull request with a clear description of your changes together with their purpose.

## Credits

This project started from Feb 2023, the contributors of this projects include:

| Student     | GitHub Account                                    | Enrollment Date | State  |
| ----------- | ------------------------------------------------- | --------------- | ------ |
| Xiang Siqi  | [TsukiSky](https://github.com/TsukiSky)           | Feb 2023        | Active |
| Wang Yanbao | [wangyanbao666](https://github.com/wangyanbao666) | Feb 2023        | Active |
| Wang Zuoran | [wzrwzr23](https://github.com/wzrwzr23)           | Feb 2023        | Active |

## License

This project is under the MIT License.
