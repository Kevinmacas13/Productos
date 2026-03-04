import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useState } from "react";
let productos = [
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
];
export default function App() {
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [precioCompra, setPrecioCompra] = useState("");
  const [precioVenta, setPrecioVenta] = useState("");
  const [esNuevo, setEsNuevo] = useState(false);
  const [editar, setEditar] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [productoEliminar, setProductoEliminar] = useState(null);

  let nuevoProducto = () => {
    setCodigo("");
    setNombre("");
    setCategoria("");
    setPrecioCompra("");
    setPrecioVenta("");
    setEsNuevo(true);
    setEditar(true);
  };
  let guardarProducto = () => {
    if (esNuevo) {
      let nuevoProducto = {
        id: productos.length + 1,
        nombre: nombre,
        categoria: categoria,
        precioCompra: parseFloat(precioCompra),
        precioVenta: parseFloat(precioVenta),
      };

      productos.push(nuevoProducto);
      console.log("Nuevo Producto");
    } else {
      console.log("Modificar Producto");
      let indice = productos.findIndex(
        (producto) => producto.id === parseInt(codigo),
      );

      if (indice !== -1) {
        productos[indice].nombre = nombre;
        productos[indice].categoria = categoria;
        productos[indice].precioCompra = parseFloat(precioCompra);
        productos[indice].precioVenta = parseFloat(precioVenta);
      }
    }
    setEditar(false);
    setRefresh(!refresh);
    nuevoProducto();
  };

  let eliminarProducto = () => {
    if (productoEliminar !== null) {
      let indice = productos.findIndex(
        (producto) => producto.id === productoEliminar,
      );

      if (indice !== -1) {
        productos.splice(indice, 1);
      }

      setModalVisible(false);
      setProductoEliminar(null);
      setRefresh(!refresh);
    }
  };

  let ItemProducto = (props) => (
    <TouchableOpacity
      onPress={() => {
        setCodigo(props.producto.id.toString());
        setNombre(props.producto.nombre);
        setCategoria(props.producto.categoria);
        setPrecioCompra(props.producto.precioCompra.toString());
        setPrecioVenta(props.producto.precioVenta.toString());
        setEsNuevo(false);
        setEditar(true);
      }}
    >
      <View style={styles.itemNumeracion}>
        <Text style={styles.textoPrincipal}>{props.producto.id}</Text>

        <View style={styles.infoProducto}>
          <Text style={styles.textoPrincipal}>{props.producto.nombre}</Text>
          <Text>{props.producto.categoria}</Text>
        </View>

        <Text style={styles.textoSecundario}>{props.producto.precioVenta}</Text>

        <View style={styles.botonesCard}>
          <Button
            title="X"
            onPress={() => {
              setProductoEliminar(props.producto.id);
              setModalVisible(true);
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
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
        editable={editar}
      />
      <TextInput
        style={styles.input}
        placeholder="NOMBRE"
        value={nombre}
        onChangeText={(texto) => setNombre(texto)}
        editable={editar}
      />
      <TextInput
        style={styles.input}
        placeholder="CATEGORIA"
        value={categoria}
        onChangeText={(texto) => setCategoria(texto)}
        editable={editar}
      />
      <TextInput
        style={styles.input}
        placeholder="PRECIO DE COMPRA"
        value={precioCompra}
        keyboardType="numeric"
        onChangeText={(texto) => setPrecioCompra(texto)}
        editable={editar}
      />
      <TextInput
        style={styles.input}
        placeholder="PRECIO DE VENTA"
        value={precioVenta}
        onChangeText={(texto) => setPrecioVenta(texto)}
        editable={editar}
      />
      <View style={styles.botonera}>
        <Button title="NUEVO" onPress={() => nuevoProducto()}></Button>
        <Button title="GUARDAR" onPress={() => guardarProducto()}></Button>
        <Text>Productos: {productos.length}</Text>
      </View>

      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
              width: 250,
              alignItems: "center",
            }}
          >
            <Text style={{ marginBottom: 20 }}>
              ¿Está seguro que quiere eliminar?
            </Text>

            <View style={{ flexDirection: "row", gap: 10 }}>
              <Button title="Aceptar" onPress={eliminarProducto} />
              <Button title="Cancelar" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
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
});
