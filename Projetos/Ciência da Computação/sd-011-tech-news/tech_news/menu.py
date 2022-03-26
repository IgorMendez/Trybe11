import sys


# Requisito 12
def analyzer_menu():
    OPTION = input(
        """
 Selecione uma das opções a seguir:
 0 - Popular o banco com notícias;
 1 - Buscar notícias por título;
 2 - Buscar notícias por data;
 3 - Buscar notícias por fonte;
 4 - Buscar notícias por categoria;
 5 - Listar top 5 notícias;
 6 - Listar top 5 categorias;
 7 - Sair."""
    )

    OPTIONS_SELECTION = {
        "0": lambda _: input("Digite quantas notícias serão buscadas: "),
        "1": lambda _: input("Digite o título: "),
        "2": lambda _: input("Digite a data no formato aaaa-mm-dd: "),
        "3": lambda _: input("Digite a fonte: "),
        "4": lambda _: input("Digite a categoria: "),
    }

    try:
        OPTIONS_SELECTION[OPTION]
    except KeyError:
        sys.stderr.write("Opção inválida\n")
