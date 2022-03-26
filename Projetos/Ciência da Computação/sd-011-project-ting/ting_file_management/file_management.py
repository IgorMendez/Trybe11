import sys


def txt_importer(path_file):
    if path_file[-4:] != ".txt":
        sys.stderr.write("Formato inválido\n")
        return sys.stderr
    try:
        getLines = open(path_file)
        list_lines = []
        for lines in getLines:
            list_lines.append(lines.strip("\n"))
        return list_lines
    except FileNotFoundError:
        return sys.stderr.write(f"Arquivo {path_file} não encontrado\n")
