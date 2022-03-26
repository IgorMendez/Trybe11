import re


def exists_word(word, instance):
    word_list = []
    for el in instance.value:
        is_in = []

        word_list.append(
            {
                "palavra": word,
                "arquivo": el["nome_do_arquivo"],
                "ocorrencias": is_in,
            }
        )

        i = 1

        for line in el["linhas_do_arquivo"]:
            if word in line:
                is_in.append({"linha": i})
            i += 1
        if not len(is_in):
            word_list.pop()
    return word_list


# Busquei
# referencia no PR de um
# colega de turma https://github.com/tryber/sd-011-project-ting/pull/143/files
def search_by_word(word, instance):
    word_list = list()

    for item in instance.value:
        is_in = item["linhas_do_arquivo"]
        lines = []

        for index, i in enumerate(is_in):
            regex = re.match(f".*{word}.*", i, flags=re.IGNORECASE)
            if regex is not None:
                lines.append({"linha": index + 1, "conteudo": i})

        if len(lines):
            word_list.append(
                {
                    "palavra": word,
                    "arquivo": item["nome_do_arquivo"],
                    "ocorrencias": lines,
                }
            )

    return word_list
