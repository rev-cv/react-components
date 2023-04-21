from pathlib import Path
from datetime import datetime
from fuzzywuzzy import fuzz

current = Path.cwd()
# listdir = [x for x in list(current.iterdir()) if x.is_dir()]
listdir = list(current.iterdir())

widgets = dict()
original_files = list()


# STEP 1: поиск каталогов с виджетами
for directory in listdir:
    w = Path(directory, 'widget')
    if directory.is_dir() and w.is_dir():
        widgets[directory.name] = dict()
        for f in [x for x in w.iterdir() if x.is_file()]:
            widgets[directory.name][f.name] = [f, ]


# STEP 2: поиск в каталогах с виджетами зависимостей содержащих каталоги с вижетами
for directory in listdir:
    w = Path(directory, 'dependencies')
    if directory.is_dir() and w.is_dir():
        for dep in [x for x in w.iterdir() if x.is_dir() and x.name in widgets.keys()]:
            for f in [x for x in dep.iterdir() if x.is_file() and x.name in widgets[dep.name].keys()]:
                widgets[dep.name][f.name].append(f)
                if f.name not in original_files and ".jsx" == f.suffix:
                    original_files.append(f.name)

# for wid in widgets.keys():
#     print(f"\n{wid}")
#     for fil in widgets[wid].keys():
#         print(f'    file: "{fil}"')
#         for f in sorted(widgets[wid][fil], key=lambda x: x.stat().st_mtime, reverse=True):
#             time = datetime.fromtimestamp(f.stat().st_mtime).strftime('%Y-%m-%d %H:%M')
#             print(f'        "{f.relative_to(current)} {time}"')


# ↓ файлы между которыми обнаружено несовпадение
edited_widgets = dict()

# STEP 3: выявление отличающихся групп файлов во всех каталогах с вижетами
for widget in widgets.keys():
    list_output = list()

    for widget_files in widgets[widget].keys():
        list_input = sorted(widgets[widget][widget_files], key = lambda x: x.stat().st_mtime)

        def ff (length_arr, index_current, last_open=False):
            current = list_input[index_current]
            text = current.read_text()

            if last_open is not False:
                list_output.append([
                    current,
                    fuzz.ratio(last_open, text),
                    datetime.fromtimestamp( current.stat().st_mtime ).strftime('%Y-%m-%d %H:%M')
                ])
            else:
                # первый файл берется за основу
                list_output.append([
                    current, 
                    100, 
                    datetime.fromtimestamp( current.stat().st_mtime ).strftime('%Y-%m-%d %H:%M')
                ])

            if index_current + 1 < length_arr:
                ff(length_arr, index_current + 1, text)

        ff(len(list_input), 0)

    is_all_true = True
    for x in list_output:
        if x[1] != 100:
            is_all_true = False

    if not is_all_true:
        edited_widgets[widget] = list_output


for x in edited_widgets:
    print(x)
    for y in edited_widgets[x]:
        print(f'    {y[1]: >3}% {y[2]} {y[0].relative_to(current)}')