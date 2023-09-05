import pandas as pd

# Convert pharma.json to CSV
pharma_json_file = 'pharma.json'
pharma_df = pd.read_json(pharma_json_file)
pharma_csv_file = 'pharma.csv'
pharma_df.to_csv(pharma_csv_file, index=False)

print(f'JSON file "{pharma_json_file}" has been converted to CSV file "{pharma_csv_file}" in the same directory.')

# Convert para.json to CSV
para_json_file = 'para.json'
para_df = pd.read_json(para_json_file)
para_csv_file = 'para.csv'
para_df.to_csv(para_csv_file, index=False)

print(
    f'JSON file "{para_json_file}" has been converted to CSV file "{para_csv_file}" in the same directory.')
