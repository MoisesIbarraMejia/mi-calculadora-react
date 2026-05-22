import sys

def calcular_proceso_especial(num1, num2):
    # Simula un cálculo que queremos delegar exclusivamente a Python
    # Por ejemplo: (Número 1 elevado al cuadrado) + Número 2
    resultado = (num1 ** 2) + num2
    return resultado

if __name__ == "__main__":
    # Recibimos los argumentos enviados desde Node.js por la terminal
    try:
        n1 = float(sys.argv[1])
        n2 = float(sys.argv[2])
        
        # Hacemos el cálculo y lo imprimimos con print() para que Node lo lea
        final = calcular_proceso_especial(n1, n2)
        print(final)
    except Exception as e:
        print("Error")
