from ting_file_management.file_management import txt_importer
import sys


def process(path_file, instance):
    for name in instance.value:
        if path_file == name["nome_do_arquivo"]:
            return None

    list_lines = txt_importer(path_file)

    structure = {
        "nome_do_arquivo": path_file,
        "qtd_linhas": len(list_lines),
        "linhas_do_arquivo": list_lines,
    }
    print(structure)
    return instance.enqueue(structure)


def remove(instance):
    if not len(instance.value):
        return print("Não há elementos")

    path_file = instance.dequeue()
    print(f"Arquivo {path_file['nome_do_arquivo']} removido com sucesso")


def file_metadata(instance, position):
    try:
        result = instance.search(position)
        return sys.stdout.write(f"{result}")
    except IndexError:
        return sys.stderr.write("Posição inválida")
