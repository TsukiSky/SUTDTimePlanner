import json
import openpyxl

# static variables
ORI_FILE_PATH = 'script/2023 Trimester 1 - T4T6 (revamped).xlsx'
SHEET = 'after'

ori_workbook = openpyxl.load_workbook(ORI_FILE_PATH)
sheet = ori_workbook[SHEET]
num_of_rows = sheet.max_row

full_list = []
for i in range(1, num_of_rows+1):
    excel_row = []
    for j in range(1, 8):
        excel_row.append(sheet.cell(row=i, column=j).value)
    full_list.append(excel_row)

# Sample Excel data
# excel_row = [
#     "THU",
#     "09:00:00",
#     "18:00:00",
#     "20.101 Architecture Core Studio 1",
#     "Class",
#     "https://asd.sutd.edu.sg/programme/bachelor-of-science-architecture-and-sustainable-design/courses/20101-architecture-core-studio-1",
#     "ASD"
# ]

result = []

# Create the nested JSON
pre = full_list[0][3]
pre_json = {
        "name": full_list[0][3],
        "pillar": full_list[0][6],
        "link": full_list[0][5],
        "classes": [
            {
                "slots": [
                    {
                        "type": full_list[0][4],
                        "date": full_list[0][0],
                        "startTime": full_list[0][1],
                        "endTime": full_list[0][2]
                    }
                ]
            }
        ],
        "terms": [
            {
                "term": 6,
                "period": 'summer'
            }
        ]
    }
result.append(pre_json)
# Convert the Python dictionary to JSON
json_string = json.dumps(pre_json, indent=2)
# print(json_string)

# Save JSON to a file
with open('output.json', 'a') as json_file:
    json.dump(pre_json, json_file, indent=2)
    json_file.write(',')

for i in range(1, num_of_rows):
    if full_list[i][3] == pre:
        print(pre)
        print(full_list[i][3])
        pre_json["classes"][0]['slots'].append(
            {
                "type": full_list[i][4],
                "date": full_list[i][0],
                "startTime": full_list[i][1],
                "endTime": full_list[i][2]
            }
        )
        result[0] = pre_json
        print('-----------'+str(result[0]))
    else:
        json_data = {
            "name": full_list[i][3],
            "pillar": full_list[i][6],
            "link": full_list[i][5],
            "classes": [
                {
                    "slots": [
                        {
                            "type": full_list[i][4],
                            "date": full_list[i][0],
                            "startTime": full_list[i][1],
                            "endTime": full_list[i][2]
                        }
                    ]
                }
            ],
            "terms": [
                {
                    "term": 6,
                    "period": 'summer'
                }
            ]
        }
        pre = full_list[i][3]
        result.insert(0, json_data)
        pre_json = json_data
for data in result:
    # Convert the Python dictionary to JSON
    json_string = json.dumps(data, indent=2)
    # print(json_string)

    # Save JSON to a file
    with open('output.json', 'a') as json_file:
        json.dump(data, json_file, indent=2)
        if i!=len(result)-1:
            json_file.write(',')
