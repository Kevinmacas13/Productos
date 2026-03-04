import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TextInput,
} from "react-native";

import { useState } from "react";
export default function App() {
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [precioCompra, setPrecioCompra] = useState("");
  const [precioVenta, setPrecioVenta] = useState("");
  const [esNuevo, setEsNuevo] = useState(false);
  const [productos, setProductos] = useState([
    {
      id: 100,
      nombre: "Laptop",
      categoria: "computador",
      precioCompra: 1000,
      precioVenta: 1200,
    },
    {
      id: 101,
      nombre: "Smartphone",
      categoria: "celular",
      precioCompra: 400,
      precioVenta: 500,
    },
    {
      id: 102,
      nombre: "Tablet",
      categoria: "celular",
      precioCompra: 200,
      precioVenta: 300,
    },
    {
      id: 103,
      nombre: "Monitor",
      categoria: "computador",
      precioCompra: 150,
      precioVenta: 200,
    },
    {
      id: 104,
      nombre: "Teclado",
      categoria: "periferico",
      precioCompra: 30,
      precioVenta: 50,
    },
  ]);

  let ItemProducto = (props) => (
    <View style={styles.itemNumeracion}>
      <Text style={styles.textoPrincipal}>{props.producto.id}</Text>
      <View style={styles.infoProducto}>
        <Text style={styles.textoPrincipal}>{props.producto.nombre}</Text>
        <Text>{props.producto.categoria}</Text>
      </View>
      <Text style={styles.textoSecundario}>{props.producto.precioVenta}</Text>
      <View style={styles.botonesCard}>
        <View style={styles.boton}>
          <Button
            title="E"
            onPress={() => {
              setCodigo(props.producto.id.toString());
              setNombre(props.producto.nombre);
              setCategoria(props.producto.categoria);
              setPrecioCompra(props.producto.precioCompra.toString());
              setPrecioVenta(props.producto.precioVenta.toString());
              setEsNuevo(true);
            }}
          ></Button>
        </View>
        <View style={styles.boton}>
          <Button
            style={styles.boton}
            title="X"
            onPress={() => {
              setProductos(productos.filter((p) => p.id !== props.producto.id));
              setEsNuevo(false);
            }}
          ></Button>
        </View>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <View style={styles.encabezado}>
        <Text style={styles.title}>PRODUCTOS</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="CÓDIGO"
        value={codigo}
        onChangeText={(texto) => setCodigo(texto)}
        editable={esNuevo}
      />
      <TextInput
        style={styles.input}
        placeholder="NOMBRE"
        value={nombre}
        onChangeText={(texto) => setNombre(texto)}
        editable={esNuevo}
      />
      <TextInput
        style={styles.input}
        placeholder="CATEGORIA"
        value={categoria}
        onChangeText={(texto) => setCategoria(texto)}
        editable={esNuevo}
      />
      <TextInput
        style={styles.input}
        placeholder="PRECIO DE COMPRA"
        value={precioCompra}
        keyboardType="numeric"
        onChangeText={(texto) => setPrecioCompra(texto)}
        editable={esNuevo}
      />
      <TextInput
        style={styles.input}
        placeholder="PRECIO DE VENTA"
        value={precioVenta}
        onChangeText={(texto) => setPrecioVenta(texto)}
        editable={esNuevo}
      />
      <View style={styles.botonera}>
        <Button
          title="NUEVO"
          onPress={() => {
            setCodigo("");
            setNombre("");
            setCategoria("");
            setPrecioCompra("");
            setPrecioVenta("");
            setEsNuevo(true);
          }}
        ></Button>
        <Button
          title="GUARDAR"
          onPress={() => {
            let nuevoProducto = {
              id: productos.length + 1,
              nombre: nombre,
              categoria: categoria,
              precio: parseFloat(precioVenta),
            };
            setProductos([...productos, nuevoProducto]);
            setCodigo("");
            setNombre("");
            setCategoria("");
            setPrecioCompra("");
            setPrecioVenta("");
            setEsNuevo(false);
          }}
        ></Button>
        <Text>Productos: {productos.length}</Text>
      </View>
      <FlatList
        style={styles.lista}
        data={productos}
        renderItem={(elemento) => {
          return (
            <ItemProducto indice={elemento.index} producto={elemento.item} />
          );
        }}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "flex-start",
    paddingTop: 50,
  },
  input: {
    height: 40,
    borderColor: "#0c0c0c",
    borderWidth: 1,
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },
  lista: {
    margin: 10,
    backgroundColor: "#fff",
  },
  itemProducto: {
    backgroundColor: "#a6e09a",
    padding: 20,
    marginVertical: 5,
    flexDirection: "row",
  },
  itemNumeracion: {
    backgroundColor: "#a6e09a",
    padding: 20,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  textoPrincipal: {
    flex: 2,
    fontSize: 18,
    fontWeight: "bold",
    color: "#0c0c0c",
  },
  textoSecundario: {
    fontSize: 14,
    color: "#1f1c1c",
    flex: 3,
    alignItems: "center",
  },
  encabezado: {
    padding: 20,
    marginBottom: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0c0c0c",
  },
  areaIndice: {
    backgroundColor: "#0c0c0c",
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  botonera: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  botonesCard: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "space-around",
    marginLeft: "auto",
    paddingRight: 10,
    gap: 10,
  },
  infoProducto: {
    marginLeft: 10,
    flex: 9,
  },
  boton: {
    width: 35,
  },
});
