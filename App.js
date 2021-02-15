/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      milissegundo: 0,
      hora: 0,
      minuto: 0,
      segundo: 0,
      botao: 'Iniciar',
      ultimo: null
    };

    this.timer = null;

    this.iniciar = this.iniciar.bind(this);
    this.limpar = this.limpar.bind(this);
    this.contador = this.contador.bind(this);
  }

  contador() {
    let count_milissegundo = this.state.milissegundo;
    let count_segundo = this.state.segundo;
    let count_minuto = this.state.minuto;
    let count_hora = this.state.hora;

    if ((count_milissegundo += 10) == 1000) {
      count_milissegundo = 0;
      count_segundo++;
    }

    if (count_segundo == 60) {
      count_segundo = 0;
      count_minuto++;
    }

    if (count_minuto == 60) {
      count_minuto = 0;
      count_hora++;
    }

    this.setState({
      milissegundo: count_milissegundo,
      segundo: count_segundo,
      minuto: count_minuto,
      hora: count_hora
    })
  }

  iniciar() {
    if (this.timer != null) {
      clearInterval(this.timer);
      this.timer = null;

      this.setState({ botao: 'Iniciar' });
    } else {
      this.timer = setInterval(this.contador, 10);

      this.setState({ botao: 'Parar' });
    }
  }

  limpar() {
    if (this.timer != null) {
      clearInterval(this.timer);
      this.timer = null;
    }

    let count_ultimo = this.state.hora.toString().padStart(2, "0") + ":" +
      this.state.minuto.toString().padStart(2, "0") + ":" +
      this.state.segundo.toString().padStart(2, "0") + "." +
      this.state.milissegundo.toString().padStart(3, "0");

    this.setState({
      ultimo: count_ultimo,
      milissegundo: 0,
      segundo: 0,
      minuto: 0,
      hora: 0,
      botao: 'Iniciar'
    });
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.resultado}>
          <Text style={styles.textoResultado}>
            Ultimo tempo: {this.state.ultimo != null ? this.state.ultimo : ' - '}
          </Text>
        </View>

        <Image
          source={require('./src/images/cronometro.gif')}
          style={styles.cronometro} />

        <Text style={styles.timer}>{
          this.state.hora.toString().padStart(2, "0") + ":" +
          this.state.minuto.toString().padStart(2, "0") + ":" +
          this.state.segundo.toString().padStart(2, "0") + "." +
          this.state.milissegundo.toString().padStart(3, "0")}
        </Text>

        <View style={styles.btnArea}>
          <TouchableOpacity style={styles.btn} onPress={this.iniciar}>
            <Text style={styles.btnText}>{this.state.botao}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} onPress={this.limpar}>
            <Text style={styles.btnText}>Zerar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00aeef'
  },
  timer: {
    marginTop: 180,
    color: '#FFF',
    fontSize: 45,
    fontWeight: 'bold',
  },
  cronometro: {
    width: 400,
    resizeMode: 'contain',
    position: 'absolute'
  },
  btnArea: {
    flexDirection: 'row',
    marginTop: 140,
    height: 40
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    height: 40,
    margin: 17,
    borderRadius: 9
  },
  btnText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00aeef'
  },
  resultado: {
    marginTop: -40
  },
  textoResultado: {
    fontSize: 25,
    fontStyle: 'italic',
    color: '#FFF'
  }
});

export default App;
