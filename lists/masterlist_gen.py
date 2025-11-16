import os
import json

def read_first_line_of_txt_files(directory):
    data = {'checklist': []}

    # Loop through all files in the specified directory
    for filename in os.listdir(directory):
        if filename.endswith('.txt'):
            file_path = os.path.join(directory, filename)
            with open(file_path, 'r', encoding='utf-8') as file:
                first_line = file.readline().strip()  # Read the first line
                data['checklist'].append({'file': filename, 'name': first_line})

    return data

def main():
    # Use the current working directory
    directory = os.getcwd()

    # Get the data
    json_data = read_first_line_of_txt_files(directory)

    # Sort the checklist array alphabetically by the 'name' field
    json_data['checklist'].sort(key=lambda x: x['name'])

    # Specify the output JSON file
    output_file = 'masterlist.json'
    # output_file = input("JSON Filename:")
    with open(output_file, 'w', encoding='utf-8') as json_file:
        json.dump(json_data, json_file, ensure_ascii=False, indent=4)

    print(f"JSON data has been written to {output_file}")

if __name__ == "__main__":
    main()

