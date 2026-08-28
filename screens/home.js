const CONFIG = {
    cellSize: 120, // Tamanho das células da malha
    colors: {
        verde: "#009C3B",
        amarelo: "#FFDF00",
        azul: "#002776",
        branco: "#FFFFFF"
    },
    timing: {
        trocaPadrao: 40,           // tempo entre trocas de cada padrão
        inicioCrescimento: 30,     // tempo que o circulo azul começa a crescer
        crescimentoMax: 1.10,      // tamanho máximo do circulo azul
        velocidadeCrescimento: 12  // velocidade de crescimento do circulo azul
    }
};
// Paletas de cores para os padrões
const PALETTES = {
    inicial: [CONFIG.colors.verde, CONFIG.colors.amarelo, CONFIG.colors.azul], // padrão inicial
    crescida: [ // padrão após crescimento, pra deixar os desenhos com menos azul
        CONFIG.colors.verde, CONFIG.colors.verde,
        CONFIG.colors.amarelo, CONFIG.colors.amarelo,
        CONFIG.colors.verde, CONFIG.colors.amarelo,
        CONFIG.colors.verde, CONFIG.colors.azul
    ]
};
// Classe principal da tela Home
export default class HomeScreen {
// Construtor da classe
    constructor() {
        this.cells = []; // Array de células da malha
        this.currentPattern = floor(random(4)); // Padrão atual
        this.growth = 0; // Crescimento do círculo azul
        this.isGrowing = false; // Se o círculo está crescendo
        this.grew = false; // Se o círculo já cresceu
        this.criarMalha(); // Cria a malha de células
        noStroke(); // Remove as bordas das formas
    }

    draw() { // Função principal de desenho
        background(CONFIG.colors.branco); // Preenche o fundo com branco

        if (frameCount % CONFIG.timing.trocaPadrao === 0) { // Troca o padrão a cada certo tempo
            this.novoPadrao(); // Muda o padrão
        }

        for (let cell of this.cells) { // Atualiza e desenha cada célula
            cell.update(); // Atualiza a célula
            cell.display(this.currentPattern); // Desenha a célula com o padrão atual
        }

        this.atualizarCirculo(); // Atualiza o círculo azul

        if (this.grew) { // Se o círculo já cresceu, exibe o título
            fill(CONFIG.colors.branco); // Cor do texto branco
            textAlign(CENTER, CENTER); // Centraliza o texto
            textSize(120); // Tamanho do texto
            textFont("Andale Mono, monospace"); // Fonte monoespaçada
            textStyle(BOLD); // Deixa o texto em negrito
            text("VOTE", width / 2, height / 2); // Desenha o título no centro
        }
    }

    criarMalha() { // Cria a malha de células
        this.cells = []; // Limpa o array de células

        const cols = ceil(width / CONFIG.cellSize); // Calcula o número de colunas
        const rows = ceil(height / CONFIG.cellSize); // Calcula o número de linhas

        for (let y = 0; y < rows; y++) { // Percorre todas as linhas
            for (let x = 0; x < cols; x++) { // Percorre todas as colunas
                this.cells.push(new Cell(x, y)); // Adiciona uma nova célula ao array
            }
        }
    }

    novoPadrao() { // Muda o padrão atual
        this.currentPattern = floor(random(4)); // Seleciona um padrão aleatório

        const paleta = this.grew ? PALETTES.crescida : PALETTES.inicial; // Seleciona a paleta de cores

        for (let cell of this.cells) {
            cell.color = random(paleta); // Atribui uma cor aleatória da paleta à célula
        }
    }

    atualizarCirculo() { // Atualiza o círculo azul
        if (frameCount >= CONFIG.timing.inicioCrescimento && !this.isGrowing) { // Inicia o crescimento do círculo
            this.isGrowing = true;
        }

        if (!this.isGrowing) return; // Se o círculo não está crescendo, retorna

        const maxSize = min(width, height) * CONFIG.timing.crescimentoMax; // Calcula o tamanho máximo do círculo

        if (this.growth < maxSize) { // Se o círculo ainda não atingiu o tamanho máximo
            this.growth += CONFIG.timing.velocidadeCrescimento; // Aumenta o tamanho do círculo
        } else {
            this.grew = true; // Marca que o círculo atingiu o tamanho máximo
        }

        Pattern.grew = this.grew; // Atualiza a variável global

        fill(CONFIG.colors.azul); // Preenche com a cor azul
        circle(width / 2, height / 2, this.growth); // Desenha o círculo no centro da tela
    }
}

class Cell { // Classe que representa uma célula individual

    constructor(x, y) { // Construtor da classe
        this.gridX = x; // Posição da célula na grade
        this.gridY = y; // Posição da célula na grade

        this.x = x * CONFIG.cellSize; // Posição X da célula
        this.y = y * CONFIG.cellSize; // Posição Y da célula

        this.offset = random(1000); // Offset para o ruído
        this.color = random(PALETTES.inicial); // Cor inicial da célula
    }

    update() { // Atualiza a fase da célula
        this.phase = noise( // Calcula a fase da célula usando ruído
            this.gridX * 0.15, // Escala horizontal do ruído
            this.gridY * 0.15, // Escala vertical do ruído
            frameCount * 0.002 // Tempo
        );
    }

    display(pattern) {  // Desenha a célula
        push(); // Salva o estado atual do p5
        translate(this.x, this.y); // Translada a célula para a posição correta

        fill(this.color); // Preenche com a cor da célula
        rect(0, 0, CONFIG.cellSize, CONFIG.cellSize); // Desenha o retângulo da célula

        Pattern.draw(pattern); // Desenha o padrão da célula

        pop(); // Restaura o estado anterior do p5
    }
}

class Pattern { // Classe que representa os padrões das células

    static grew = false; // Variável global que indica se o círculo atingiu o tamanho máximo

    static azul() { // Retorna a cor azul ou verde dependendo se o círculo atingiu o tamanho máximo
        return Pattern.grew ? CONFIG.colors.verde : CONFIG.colors.azul;
    }

    static draw(index) { // Desenha o padrão da célula
        if (index === 0) Pattern.drawA(); // Desenha o padrão A
        else if (index === 1) Pattern.drawB(); // Desenha o padrão B
        else if (index === 2) Pattern.drawC(); // Desenha o padrão C
        else Pattern.drawD(); // Desenha o padrão D
    }

    static drawA() { // Desenha o padrão A
        const s = CONFIG.cellSize; // Tamanho da célula

        fill(Pattern.azul());  // Preenche com a cor azul ou verde
        circle(s * 0.30, s * 0.30, s * 0.30); // Desenha um círculo

        fill(CONFIG.colors.amarelo); // Preenche com a cor amarela
        push();
        translate(s * 0.70, s * 0.30); // Translada para a posição correta
        rotate(PI / 4); // Rotaciona 45 graus
        rect(-s * 0.13, -s * 0.13, s * 0.26, s * 0.26); // Desenha um retângulo
        pop();

        fill(Pattern.azul()); // Preenche com a cor azul ou verde
        rect(s * 0.20, s * 0.60, s * 0.25, s * 0.25); // Desenha um retângulo
    }

    static drawB() { // Desenha o padrão B
        const s = CONFIG.cellSize;  // Tamanho da célula

        fill(CONFIG.colors.amarelo); // Preenche com a cor amarela
        circle(s * 0.70, s * 0.70, s * 0.42); // Desenha um círculo

        fill(CONFIG.colors.verde); // Preenche com a cor verde
        rect(s * 0.15, s * 0.20, s * 0.28, s * 0.28); // Desenha um retângulo

        fill(Pattern.azul()); // Preenche com a cor azul ou verde
        push();  // Salva o estado atual da matriz de transformação
        translate(s * 0.30, s * 0.70); // Translada para a posição correta
        rotate(PI / 4); // Rotaciona 45 graus
        rect(-s * 0.11, -s * 0.11, s * 0.22, s * 0.22); // Desenha um retângulo
        pop(); // Restaura o estado anterior da matriz de transformação
    }

    static drawC() {  // Desenha o padrão C
        const s = CONFIG.cellSize;

        fill(CONFIG.colors.verde); // Preenche com a cor verde
        push();   // Salva o estado atual da matriz de transformação
        translate(s * 0.50, s * 0.50); // Translada para a posição correta
        rotate(PI / 4); // Rotaciona 45 graus
        rect(-s * 0.23, -s * 0.23, s * 0.46, s * 0.46); // Desenha um retângulo
        pop(); // Restaura o estado anterior da matriz de transformação

        fill(CONFIG.colors.amarelo); // Preenche com a cor amarela
        circle(s * 0.18, s * 0.18, s * 0.16); // Desenha um círculo
        circle(s * 0.82, s * 0.18, s * 0.16); // Desenha um círculo
        circle(s * 0.18, s * 0.82, s * 0.16); // Desenha um círculo
        circle(s * 0.82, s * 0.82, s * 0.16); // Desenha um círculo
    }

    static drawD() { // Desenha o padrão D
        const s = CONFIG.cellSize;

        fill(Pattern.azul());   // Preenche com a cor azul ou verde
        rect(s * 0.18, s * 0.18, s * 0.64, s * 0.64);

        fill(CONFIG.colors.amarelo); // Preenche com a cor amarela
        circle(s * 0.50, s * 0.50, s * 0.32);

        fill(CONFIG.colors.verde); // Preenche com a cor verde
        push();
        translate(s * 0.50, s * 0.18); // Translada para a posição correta
        rotate(PI / 4); // Rotaciona 45 graus
        rect(-s * 0.08, -s * 0.08, s * 0.16, s * 0.16); // Desenha um retângulo
        pop();
    }
}
