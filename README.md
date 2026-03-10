# React E-Commerce 🛒

Aplicación de tienda online con catálogo de productos y carrito de compras funcional, utilizando una API mock para la gestión de productos y almacenamiento local para el carrito.

## 📋 Descripción

Esta aplicación es una tienda de comercio electrónico con funcionalidades completas:

- **Catálogo de productos**: Grid responsive con todos los productos disponibles
- **Carrito de compras**: Panel lateral deslizante con gestión del carrito
- **Gestión de cantidades**: Añadir, incrementar y decrementar cantidades de productos
- **Eliminar productos**: Opciones para eliminar productos individuales o vaciar el carrito completo
- **Persistencia de datos**: Almacenamiento local del carrito con localStorage
- **Notificaciones**: Feedback visual al añadir/eliminar productos con toast notifications
- **Cálculo de totales**: Precio total actualizado en tiempo real
- **Estados de carga**: Indicadores de carga y manejo de errores

## 🛠️ Tecnologías

- React 19
- TypeScript
- React Bootstrap v2
- Bootstrap 5
- SCSS/Sass
- React Toastify
- MockAPI
- React Testing Library
- Jest

## 🚀 Cómo Ejecutar

### Prerequisitos

- Node.js (v14 o superior)
- npm o yarn

### Instalación

1. Navega al directorio del proyecto:

```bash
cd "react-e-commerce"
```

2. Instala las dependencias:

```bash
npm install
```

3. (Opcional) Configura tu propia API en `src/utils/contants.ts`:

```ts
export const API_BASE_URL = "tu_api_url_aquí";
```

### Ejecución en Desarrollo

```bash
npm run dev
```

La aplicación se abrirá en [http://localhost:3000](http://localhost:3000).

### Ejecutar Tests

```bash
npm test
```

### Build para Producción

```bash
npm run build
```

## 📚 Conceptos Demostrados

### 1. **Custom Hook useFetch**

Hook reutilizable para peticiones a la API con manejo de estados:

```ts
export default function useFetch(url: string, options?: RequestInit) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // ...
}
```

### 2. **Gestión de Estado del Carrito**

Manejo completo del estado del carrito con localStorage:

```tsx
const addProductToCart = (id: number, name: string) => {
  const idsProducts = [...productsInCart];
  idsProducts.push(id);
  setProductsInCart(idsProducts);
  localStorage.setItem(STORAGE_PRODUCTS_IN_CART_KEY, JSON.stringify(idsProducts));
  toast.success(`Producto ${name} agregado al carrito`);
};
```

### 3. **Funciones Utilitarias para Arrays**

Funciones reutilizables para manipular arrays del carrito:

```tsx
// Contar duplicados para calcular cantidades
countDuplicates(idProduct, productsInCart);

// Eliminar duplicados para obtener productos únicos
removeDuplicates(productsInCart);

// Eliminar una ocurrencia del producto
removeItemOnce(productsInCart, idProduct);
```

### 4. **Panel Lateral Deslizante**

Carrito implementado como un panel lateral con ancho dinámico:

```tsx
const widthCartContent = cartOpen ? "400px" : "0px";
```

### 5. **Notificaciones Toast**

Feedback visual para acciones del usuario:

```tsx
<ToastContainer
  position="bottom-left"
  autoClose={3000}
  hideProgressBar
  newestOnTop
/>
```

### 6. **Grid Responsive con Bootstrap**

Catálogo adaptable a diferentes tamaños de pantalla:

```tsx
<Container>
  <Row>
    {data.map((product) => (
      <Product key={product.id} product={product} />
    ))}
  </Row>
</Container>
```

### 7. **Modal de Confirmación**

Confirmación antes de vaciar el carrito completo:

```tsx
<Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Confirmar acción</Modal.Title>
  </Modal.Header>
  <Modal.Body>¿Estás seguro de que quieres vaciar el carrito?</Modal.Body>
</Modal>
```

## 📁 Estructura del Proyecto

```text
react-e-commerce/
├── public/
│   ├── index.html
│   └── img/
├── src/
│   ├── assets/
│   │   └── svg/
│   ├── components/
│   │   ├── Cart/
│   │   │   ├── Cart.tsx
│   │   │   ├── Cart.scss
│   │   │   ├── Cart.test.tsx
│   │   │   └── index.tsx
│   │   ├── Error/
│   │   ├── Loading/
│   │   ├── Product/
│   │   ├── Products/
│   │   └── TopMenu/
│   ├── db/
│   │   └── dbProducts.json
│   ├── hooks/
│   │   ├── useFetch.ts
│   │   └── useFetch.test.ts
│   ├── utils/
│   │   ├── arrayFunctions.ts
│   │   ├── arrayFunctions.test.ts
│   │   └── contants.ts
│   ├── App.tsx
│   ├── index.scss
│   └── index.tsx
└── package.json
```

## 🎯 Características Principales

### Catálogo de Productos

- ✅ Grid responsive adaptado a móviles, tablets y escritorio
- ✅ Tarjetas de productos con imagen, nombre y precio
- ✅ Botón de añadir al carrito con icono dinámico
- ✅ Estados de carga y error manejados

### Carrito de Compras

- ✅ Panel lateral deslizante con animación suave
- ✅ Lista de productos con imagen, nombre, precio y cantidad
- ✅ Botones para incrementar/decrementar cantidades
- ✅ Eliminar productos individuales
- ✅ Vaciar carrito completo con confirmación
- ✅ Cálculo automático del precio total
- ✅ Persistencia en localStorage

### Notificaciones

- ✅ Toast al añadir productos al carrito
- ✅ Toast al eliminar productos
- ✅ Toast al vaciar el carrito
- ✅ Posición personalizable y auto-cierre

### Estados de UI

- ✅ Loading spinner durante la carga de productos
- ✅ Mensajes de error si falla la petición
- ✅ Icono del carrito cambia según esté vacío o lleno
- ✅ Badge con número de productos en el carrito

## 🧪 Testing

El proyecto incluye tests para los componentes principales y funciones utilitarias:

- Tests de componentes con React Testing Library
- Tests de hooks personalizados
- Tests de funciones auxiliares

Ejecuta los tests con:

```bash
npm test
```

## 🔧 Configuración

### API Mock

El proyecto utiliza MockAPI para simular un backend. Para configurar tu propia API:

1. **Crear cuenta en MockAPI**: Ve a [mockapi.io](https://mockapi.io) y crea una cuenta gratuita

2. **Crear un nuevo proyecto**: Haz clic en "New Project" y dale un nombre

3. **Crear el recurso de productos**:
   - Haz clic en "New Resource"
   - Nombre del recurso: `products`
   - MockAPI generará automáticamente endpoints REST

4. **Importar los datos de productos**:
   - En la sección de datos del recurso `products`, haz clic en "Data"
   - Copia el contenido del archivo `src/db/dbProducts.json`
   - Pega el JSON en la interfaz de MockAPI para cargar los productos

5. **Actualizar la URL en el proyecto**: Copia la URL de tu endpoint y actualízala en `src/utils/contants.ts`:

```ts
export const API_BASE_URL = "https://[tu-proyecto-id].mockapi.io/products";
```

> **Nota**: El proyecto ya incluye una API mock funcional. Solo necesitas seguir estos pasos si quieres usar tu propia instancia de MockAPI.

### localStorage

El carrito se persiste en localStorage con la clave definida en:

```ts
export const STORAGE_PRODUCTS_IN_CART_KEY = "productsInCart";
```

## 🤝 Contribuciones

Este es un proyecto educativo. Siéntete libre de hacer fork y experimentar con diferentes conceptos de React.

## 📝 Licencia

MIT

## 👨‍💻 Autor

**Xavier Palacín Ayuso**
Email: cubiczx@hotmail.com
GitHub: [@cubiczx](https://github.com/cubiczx)

Proyecto creado como parte del curso de React en Udemy.