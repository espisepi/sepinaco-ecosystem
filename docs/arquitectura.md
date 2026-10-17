A ver, déjame pensarlo un segundo.

Sí, exactamente. **En Angular moderno, los proyectos grandes se siguen dividiendo por funcionalidades, pero ya no necesitas crear un `NgModule` para cada una.**

Lo importante es entender que **Angular no ha eliminado la modularidad, sino que ha cambiado cómo se implementa**.

Antes, en un proyecto grande, podías tener:

- `UsersModule`
- `ProductsModule`
- `CheckoutModule`
- `AdminModule`

Cada módulo declaraba sus componentes, pipes y directivas.

Ahora, con los componentes standalone, puedes mantener esas mismas divisiones, pero organizándolas mediante carpetas, rutas y servicios.

Por ejemplo:

```text
src/app/
│
├── core/
│   ├── auth/
│   ├── guards/
│   └── interceptors/
│
├── shared/
│   ├── components/
│   ├── pipes/
│   └── directives/
│
├── features/
│   ├── users/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   └── users.routes.ts
│   │
│   ├── products/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── pipes/
│   │   └── products.routes.ts
│   │
│   └── checkout/
│       ├── pages/
│       ├── components/
│       └── checkout.routes.ts
│
├── app.config.ts
└── app.routes.ts
```

Aquí cada funcionalidad está perfectamente separada sin necesitar ningún `NgModule`.

### ¿Y cómo se conectan las funcionalidades?

Aquí está una de las principales diferencias: **ahora puedes utilizar los archivos de rutas como punto de entrada de cada funcionalidad**.

Por ejemplo, en `app.routes.ts`:

```typescript
export const routes: Routes = [
  {
    path: 'users',
    loadChildren: () =>
      import('./features/users/users.routes')
        .then(m => m.USERS_ROUTES)
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./features/products/products.routes')
        .then(m => m.PRODUCTS_ROUTES)
  }
];
```

Y dentro de `users.routes.ts`:

```typescript
export const USERS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/users-page.component')
        .then(m => m.UsersPageComponent)
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/user-detail.component')
        .then(m => m.UserDetailComponent)
  }
];
```

Con esto consigues algo muy parecido a los antiguos módulos de funcionalidades, incluido el **lazy loading**, pero sin utilizar `NgModule`. [v20.angular.dev](https://v20.angular.dev/guide/routing/define-routes?utm_source=chatgpt.com)

### ¿Y los servicios, pipes y directivas?

Los organizas igualmente dentro de sus carpetas.

- **Componentes, pipes y directivas:** son standalone y se importan directamente donde se necesitan.
- **Servicios globales:** normalmente utilizan `providedIn: 'root'`.
- **Servicios específicos de una funcionalidad:** pueden declararse en los `providers` de sus rutas para limitar su ámbito.

Además, desde Angular 19, los componentes son standalone por defecto, por lo que ya no necesitas escribir `standalone: true` expresamente. [Angular](https://angular.dev/guide/components/importing?utm_source=chatgpt.com)

### Mi recomendación para proyectos empresariales grandes

Utilizaría una arquitectura **feature-based**, organizando el código por funcionalidades de negocio y no simplemente por tipos de archivos.

Y hay un detalle importante: **standalone no significa que cada componente deba funcionar completamente aislado**. Puedes crear componentes reutilizables, compartir servicios y establecer límites claros entre funcionalidades.

De hecho, para proyectos Angular enormes, incluso puedes llevar esta separación más lejos mediante librerías internas en un monorepositorio, por ejemplo con Nx.

**En definitiva: antes utilizabas los `NgModule` para agrupar funcionalidades; ahora utilizas carpetas, rutas, imports y providers para conseguir esa misma organización, con mayor flexibilidad.**

Sí, exacto. En proyectos grandes sigues organizando por funcionalidades o por carpetas, pero ya no necesitas un 'NgModule' para cada una. En lugar de declarar todo en módulos, cada componente es autónomo y lo que antes agrupabas en módulos, ahora lo agrupas por rutas y por estructura de carpetas. Por ejemplo, tienes /features/usuarios con sus propias rutas, componentes, servicios y pipes, y luego enlazas esa funcionalidad usando archivos de rutas con 'loadChildren' o 'loadComponent' en el nivel de rutas. En resumen: misma idea de separación, pero sin la sobrecarga de NgModules, más flexible y más explícito.
