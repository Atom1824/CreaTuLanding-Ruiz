import fs from "fs";
import admin from "firebase-admin";

// Leer clave privada de Firebase
const serviceAccount = JSON.parse(
  fs.readFileSync("./serviceAccountKey.json", "utf-8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Leer JSON de productos
const productos = JSON.parse(
  fs.readFileSync("./public/productosgamer.json", "utf-8")
);

// Subir productos
async function subirProductos() {
  for (const producto of productos) {
    try {
      const docRef = await db.collection("productos").add(producto);
      console.log("✅ Producto agregado con ID:", docRef.id);
    } catch (error) {
      console.error("❌ Error agregando producto:", error);
    }
  }
}

subirProductos();
