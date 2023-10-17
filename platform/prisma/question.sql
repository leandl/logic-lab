insert into `question` (`category_id`, `description`, `description_result`, `document_markdown`, `id`, `name`, `params`, `tests`, `type_result`) values (1, 'Faça com que a função pegue o parâmetro \"texto\" que está sendo passado e retorne a string na ordem inversa.\n', 'O retorno deverá ser do tipo string e conter o valor passado na entrada de forma inversa.', NULL, 1, 'Primeiro reverso', '[{\"name\":\"texto\",\"type\":\"STRING\",\"description\":\"Variável \\\"texto\\\" do tipo string, irá conter uma sentença comum.\\n\"}]', '[{\"args\":[\"Hello World and Coders\"],\"result\":\"sredoC dna dlroW olleH\"},{\"args\":[\"sopapos\"],\"result\":\"sopapos\"},{\"args\":[\"A base do teto desaba\"],\"result\":\"abased otet od esab A\"},{\"args\":[\"Primeiro reverso\"],\"result\":\"osrever oriemirP\"},{\"args\":[\"IFSC\"],\"result\":\"CSFI\"}]', 'STRING'), (1, 'Faça com que a função pegue o parâmetro \"letra\" que está sendo passado e retorne se a \"letra\" digitada é \"Vogal\" ou \"Consoante\".', 'O retorno deverá ser do tipo string e apresentar se a letra digitada é uma vogal retornando “Vogal” ou uma consoante, retornando “Consoante”.', NULL, 2, 'Vogal ou Consoante', '[{\"name\":\"letra\",\"type\":\"STRING\",\"description\":\"Variável \\\"letra\\\" do tipo string, irá conter uma letra qualquer do alfabeto.\\n\"}]', '[{\"args\":[\"a\"],\"result\":\"Vogal\"},{\"args\":[\"e\"],\"result\":\"Vogal\"},{\"args\":[\"i\"],\"result\":\"Vogal\"},{\"args\":[\"o\"],\"result\":\"Vogal\"},{\"args\":[\"u\"],\"result\":\"Vogal\"},{\"args\":[\"q\"],\"result\":\"Consoante\"},{\"args\":[\"b\"],\"result\":\"Consoante\"},{\"args\":[\"j\"],\"result\":\"Consoante\"}]', 'STRING'), (1, 'Faça com que a função pegue o parâmetro \"n\" que\nestá sendo passado e retorne uma string com o\nnúmero de casas brancas e o número de casas\npretas do tabuleiro.', 'O retorno deverá mostrar o número de casas\nbrancas e o número de casas pretas do tabuleiro.', NULL, 3, 'Xadrez', '[{\"name\":\"num\",\"type\":\"INTEGER\",\"description\":\"Variável \\\"n\\\" (int) irá conter um número entre 2 à 100\"}]', '[{\"args\":[3],\"result\":\"5 casas brancas e 4 casas pretas\"},{\"args\":[4],\"result\":\"8 casas brancas e 8 casas pretas\"},{\"args\":[5],\"result\":\"13 casas brancas e 12 casas pretas\"},{\"args\":[6],\"result\":\"18 casas brancas e 18 casas pretas\"},{\"args\":[2],\"result\":\"2 casas brancas e 2 casas pretas\"},{\"args\":[100],\"result\":\"5000 casas brancas e 5000 casas pretas\"}]', 'STRING'), (1, 'Valentina é uma mulher muito dedicada e costuma trabalhar até tarde todos os dias.\nPara economizar tempo, ela faz a lista de compras do mercado em um aplicativo e costuma \nanotar cada item na mesma hora que percebe a falta dele em casa.\nO problema é que o aplicativo não exclui itens duplicados e como Valentina é distraída, anota o \nmesmo item mais de uma vez e a lista acaba ficando extensa. Sua tarefa como programadora e \namiga de Valentina é melhorar o aplicativo de notas desenvolvendo um código que exclua os \nitens duplicados da lista de compras e que os ordene alfabeticamente.\n', 'O retorno contém uma string representando uma das listas de compras de Valentina, sem itens repetidos e em ordem alfabética.', NULL, 4, 'Lista de Compras', '[{\"name\":\"lista\",\"type\":\"STRING\",\"description\":\"Variável \\\"lista\\\" (string) consiste em uma única linha que contém de 1 a 1000 itens ou palavras compostas apenas de letras minúsculas (de 1 a 20 letras), sem acentos e separadas por um espaço\"}]', '[{\"args\":[\"carne laranja suco picles laranja picles\"],\"result\":\"carne laranja suco picles\"},{\"args\":[\"laranja pera laranja pera pera\"],\"result\":\"laranja pera\"},{\"args\":[\"arroz arroz cafe feijao feijao leite macarrao\"],\"result\":\"arroz cafe feijao leite macarrao\"},{\"args\":[\"iogurte leite manteiga pao queijo queijo\"],\"result\":\"iogurte leite manteiga pao queijo\"},{\"args\":[\"azeite batata cenoura cerveja cerveja macarrao refrigerante refrigerante\"],\"result\":\"azeite batata cenoura cerveja macarrao refrigerante\"},{\"args\":[\"arroz cafe feijao macarrao pao pao\"],\"result\":\"arroz cafe feijao macarrao pao\"}]', 'STRING'), (1, 'Será dado a você um vetor com N números, onde todos estarão em pares. Porém um desses números \nacabou ficando sem par, você consegue identificar qual é esse número ?\n\nPor exemplo, A = {1, 1, 3, 3, 5, 5, 5}, o número que ficou sozinho foi o 5', 'O retorno para cada caso de teste imprima apenas os números que ficou sozinho.', NULL, 5, 'Número Solitário', '[{\"name\":\"numeros\",\"type\":\"STRING\",\"description\":\"Vetor com números inteiros entre 1 e 10^5.\"}]', '[{\"args\":[\"[1, 3, 4, 3, 1]\"],\"result\":\"[4]\"},{\"args\":[\"[1, 1, 1]\"],\"result\":\"[1]\"},{\"args\":[\"[2, 1, 1, 3]\"],\"result\":\"[2, 3]\"},{\"args\":[\"[]\"],\"result\":\"[]\"},{\"args\":[\"[1, 1]\"],\"result\":\"[]\"},{\"args\":[\"[1, 2, 3, 5, 3]\"],\"result\":\"[1, 2, 5]\"}]', 'STRING'), (1, 'John está trabalhando numa mina de diamantes. Seu trabalho é extrair a maior quantidade de diamantes possível “<>”.\nEle precisa retirar todas as partículas de areia “.” que ele achar, neste processo o diamantes pode ser extraído e assim novos diamantes serão\nformados. Se ele obter uma entrada: “<... << .. >> ....> .... >>>”, 3 diamantes serão formados. O primeiro vem de “<..>,\nresultando “ <... <> ....> .... >>>”. O segundo diamante então é removido “<.......> .... >>>”. \nO terceiro diamante então é removido e deixado no final “ ..... >>>”, sem a possibilidade de extrair mais diamantes.', 'O retorno deverá mostrar o número de diamantes extraídos.\n', NULL, 6, 'Diamantes e Areia', '[{\"name\":\"line_to_extract\",\"type\":\"STRING\",\"description\":\"\\\"line_to_extract\\\" (string) é uma linha de até 1000 caracteres que contém caracteres como “<”, “>” e “.”.\\n\"}]', '[{\"args\":[\"<..><.<..>>\"],\"result\":3},{\"args\":[\" \"],\"result\":0},{\"args\":[\"<<<..<......<<<<....>\"],\"result\":1},{\"args\":[\"<>\"],\"result\":1},{\"args\":[\"<<>...>><..>>\"],\"result\":3}]', 'INTEGER'), (1, 'O triângulo de Pascal (alguns países, nomeadamente em França, é conhecido como \nTriângulo de Tartaglia) é um triângulo numérico infinito \nformado por números binomiais Binomial, onde n representa o\nnúmero da linha e k representa o número da coluna, iniciando a contagem \na partir do zero. O triângulo foi descoberto pelo matemático chinês Yang Hui, e\n500 anos depois várias de suas propriedades foram estudadas pelo francês Blaise\nPascal. Cada número do triângulo de Pascal é igual à soma do número imediatamente \nacima e do antecessor do número de cima.\n\n\nDavid, o fera do seu time de programação competitiva, descobriu que a soma da \ni-ésima linha de um triângulo de pascal é 2^i. Ele quer agora descobrir a soma do \ntriângulo inteiro, de N linhas. Mas como ele achou \nque este problema era muito trivial para merecer a \natenção dele, ele decidiu tentar resolver um problema \nsobre grafos bipartidos (um tópico muito mais difícil) e\nassim, sobrou para você encontrar a solução deste \nproblema.\n', 'O retorno deve conter a soma do triângulo de pascal de N linhas.', NULL, 7, 'Triângulo de Pascal', '[{\"name\":\"linhas\",\"type\":\"INTEGER\",\"description\":\"Variável \\\"linhas\\\"(int) (1 ≤ N ≤ 31), o número de linhas do Triângulo de Pascal.\"}]', '[{\"args\":[10],\"result\":1023},{\"args\":[28],\"result\":268435455},{\"args\":[25],\"result\":33554431},{\"args\":[19],\"result\":524287},{\"args\":[13],\"result\":8191},{\"args\":[22],\"result\":4194303}]', 'INTEGER'), (1, 'Marcos está dando seus primeiros passos para aprender composição de Jingles. Mas ele está tendo muita dificuldade para obter resultados, mas pelo menos ele está conseguindo produzir melodias atraentes.\nNa música, cada nota tem seu tom (sua frequência, resultando o quão alto ou baixo é seu som) e sua duração (quão longa a nota deve ser). Neste problema estamos interessados apenas na duração das notas.\nUm jingle é dividido numa sequência de compassos, e o compasso é formado por uma série de notas.\nA duração da nota é dada pelo seu formato. Neste problema nós vamos utilizar letras em maiúsculo para indicar a duração das notas. A lista a seguir contém o valor de cada nota disponível (PDF).\nA duração do compasso é a soma das durações de notas do mesmo. No Jingle de Marcos, cada compasso tem a mesma duração. Como Marcos ainda é um iniciante, o seu famoso professor Johann Sebastian III ensinou a ele que a duração de todo compasso deve ser 1.\n', 'O retorno deverá mostrar o número de compassos correto da composição.', NULL, 8, 'Compondo Jingles', '[{\"name\":\"musica\",\"type\":\"STRING\",\"description\":\"Variável \\\"musica\\\"(string) que poderá conter entre 3 a 200 caracteres representando a composição de Marcos.\\nA composição começa e termina com uma barra “/”.\\nCada compasso é dividido dentro de uma composição também por uma barra “/”.\\nCada nota é representada por uma letra em maiúsculo da tabela apresentada acima.\"}]', '[{\"args\":[\"/HH/QQQQ/XXXTXTEQH/W/HW/\"],\"result\":4},{\"args\":[\"/W/W/SQHES/\"],\"result\":3},{\"args\":[\"/WE/TEX/THES/\"],\"result\":0},{\"args\":[\"/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/\"],\"result\":1}]', 'INTEGER'), (1, 'John quer montar um painel contendo diversos números com LEDs.\nEle não tem muitos leds e não sabe se tem a quantidade necessária para montar seu painel.\nConsiderando a imagem abaixo, faça um algoritmo para ajudar John a descobrir quantos leds \nserá necessário para ele montar seu painel.', 'O retorno deverá ser o número o retorno deve conter o número de leds para representar aquela string \nno painel seguido da palavra \"leds\".', NULL, 9, 'LEDS', '[{\"name\":\"numeros\",\"type\":\"STRING\",\"description\":\"Variável\\\"numeros\\\"(string) entre (1 ≤ V ≤ 10100) correspondente ao número que John deseja montar no painel. \"}]', '[{\"args\":[\"1\"],\"result\":\"2 leds\"},{\"args\":[\"115380\"],\"result\":\"27 leds\"},{\"args\":[\"2819311\"],\"result\":\"29 leds\"},{\"args\":[\"23456\"],\"result\":\"25 leds\"}]', 'STRING'), (1, 'Diana está trabalhando para escrever uma lista com todos números inteiros entre A e B. \nEla deseja saber a contagem de cada dígito entre 1 e 9 que irá ser utilizado nesta contagem.', 'O retorno deverá apresentar a contagem de cada dígito entre 1 e 9 da contagem dada entre A e B em uma única linha. (string)\n', NULL, 10, 'Contador de Dígitos', '[{\"name\":\"numero_a\",\"type\":\"INTEGER\",\"description\":\"Variável \\\"numero_a\\\"(int), número inicial.\"},{\"name\":\"numero_b\",\"type\":\"INTEGER\",\"description\":\"Variável \\\"numero_b\\\"(int), número final.\"}]', '[{\"args\":[1,9],\"result\":\"0 1 1 1 1 1 1 1 1 1\"},{\"args\":[12,321],\"result\":\"61 169 163 83 61 61 61 61 61 61\"},{\"args\":[12345678,12345679],\"result\":\"0 2 2 2 2 2 2 2 1 1\"}]', 'STRING')
