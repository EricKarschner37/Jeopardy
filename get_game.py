from bs4 import BeautifulSoup
from urllib.request import urlopen
import csv
import sys
import os

def get_from_url(url):
    if not os.environ.get('J_GAME_ROOT'):
        print("Error: `J_GAME_ROOT` environment variable should be set. See documentation for details.")
        sys.exit(1)
    root = f'{os.environ.get("J_GAME_ROOT")}/{url[-4:]}'
    if os.path.exists(root):
        print(f"Error: {J_GAME_ROOT}/{url[-4:]} already exists.")
        sys.exit(2)

    html = urlopen(url).read()
    html = html.replace(b"&lt;", b"<")
    html = html.replace(b"&gt;", b">")
    soup = BeautifulSoup(html)
    table = soup.select_one('div#jeopardy_round').select_one('table.round')

    single_cat, single_clues, single_answers = pull_from_table(table)
    table = soup.select_one('div#double_jeopardy_round').select_one('table.round')
    double_cat, double_clues, double_answers = pull_from_table(table)
    final_table = soup.select_one("table.final_round")
    final_cat = final_table.select_one("td.category_name").text
    final_clue = soup.select_one("td#clue_FJ").text
    final_str = str(final_table)
    final_answer = clean_str(final_str[final_str.index('correct_response')+16:final_str.index('/em')])

    os.mkdir(root)

    with open(f"{root}/single_clues.csv", 'w') as f:
        wr = csv.writer(f)
        wr.writerow(single_cat)
        wr.writerows(single_clues)
    with open(f"{root}/single_responses.csv", 'w') as f:
        wr = csv.writer(f)
        wr.writerow(single_cat)
        wr.writerows(single_answers)
    with open(f"{root}/double_clues.csv", 'w') as f:
        wr = csv.writer(f)
        wr.writerow(double_cat)
        wr.writerows(double_clues)
    with open(f"{root}/double_responses.csv", 'w') as f:
        wr = csv.writer(f)
        wr.writerow(double_cat)
        wr.writerows(double_answers)
    with open(f"{root}/double_final.csv", 'w') as f:
        wr = csv.writer(f)
        wr.writerow([final_cat])
        wr.writerow([final_clue])
        wr.writerow([final_answer])
    return soup.select_one("div#game_title").select_one("h1").text

def clean_str(s):
    s = s.replace("lt;", "").replace("gt;", "").replace("\\", "").replace("&", "").replace(";", "").replace("quot", "")
    if s[0] == 'i' and s[-2:] == '/i':
        s = s[1:-2]
    return s

def pull_from_table(table):
    categories = [td.text for td in table.select("td.category_name")]
    double = False

    clues = [[("Daily Double: " if 'clue_value_daily_double' in str(td) else "") + td.select_one("td.clue_text").text if td.find('td', {'class': 'clue_text'}) else 'This clue was missing' for td in tr.select("td.clue") ] for tr in table.select("tr") if tr.find("td", {'class': 'clue'})]
    answers = [[clean_str(str(td)[str(td).index('correct_response')+16:str(td).index('/em')]) if 'correct_response' in str(td) else 'This answer was missing' for td in tr.select("td.clue")] for tr in table.select("tr") if tr.find("td", {'class': 'clue'})]
    return categories, clues, answers

if __name__ == '__main__':
    get_from_url(f"https://www.j-archive.com/showgame.php?game_id={sys.argv[1]}")
