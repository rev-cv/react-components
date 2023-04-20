"""
Не получается из одного компонента импортировать другой компонент. Видно каким-то образом разные сборки webpack мешают друг-дружке. По этой причине было принято решение сделать «велосипед» соотносящий зависимости компонентов друг от дружки.

1. Сканируются каталоги верхнего уровня на содержание подкаталого widget. Если такой каталог есть, то имя данного каталога становится отслеживающим виджетом, а файлы в "./Widget/widget/*" добавляются на отслеживание.
2. Сканируются каталоги верхнего уровня на содержание подкаталога dependencies. Внутри каталога dependencies находятся каталоги с названием каталогов, которые уже были добавлены на ослеживание.
3. Найти файлы одного виджета, которые различаются между себой
""" 

from pathlib import Path
from datetime import datetime

current = Path.cwd()
# listdir = [x for x in list(current.iterdir()) if x.is_dir()]
listdir = list(current.iterdir())

widgets = dict()
original_files = list()

# 1
for directory in listdir:
    w = Path(directory, 'widget')
    if directory.is_dir() and w.is_dir():
        widgets[directory.name] = dict()
        for f in [x for x in w.iterdir() if x.is_file()]:
            widgets[directory.name][f.name] = [f, ]

# 2
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

# 3
for widget in widgets.keys():
    is_all_true = True

    for widget_files in widgets[widget].keys():

        def ff (length_arr, index_current, last_open=False):
            global is_all_true

            def ff2(string):
                result = True

                for x in original_files:
                    if "import" in string:
                        if x in string:
                            result = False
                return result

            text = "\n".join([
                x
                for x in widgets[widget][widget_files][index_current].read_text().split("\n")
                if ff2(x)
            ])

            if last_open is not False:
                if text != last_open:
                    is_all_true = False
            
            if index_current + 1 < length_arr:
                ff(length_arr, index_current + 1, text)
        ff(len(widgets[widget][widget_files]), 0)


    if not is_all_true:
        print(widget)
        for x in widgets[widget][widget_files]:
            print(f'    {x.relative_to(current)}')


# print(original_files)