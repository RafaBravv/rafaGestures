# rafaGestures

Es una aplicación capaz de usar la cámara del dispositivo y guardar las imágenes localmente en la sección del usuario, para que posteriormente este pueda decidir si eliminarla o guardarla en sus favoritos.


https://github.com/user-attachments/assets/5ade64b7-dd19-431f-9075-74727e7f973c



## Objetivo
Proveer una capa modular y eficiente que:
- Detecte y reconozca gestos en tiempo real.
- Abstraiga la complejidad del preprocesado y de los modelos de visión.
- Exporte eventos estandarizados que las aplicaciones puedan consumir fácilmente.
- Permita extender y personalizar gestos y modelos sin reescribir la lógica central.

## Funcionalidades principales
- Captura de entradas desde múltiples adaptadores: cámara, vídeo, touch y mouse.
- Extracción de keypoints (puntos de interés) y normalización espacial/temporal.
- Suavizado temporal para reducir ruido y evitar pulsos falsos.
- Reconocimiento de gestos mediante heurísticas y/o modelos ML.
- Máquina de estados para gestionar inicio, seguimiento y finalización de gestos.
- Emisión de eventos con payloads uniformes que incluyen tipo, confianza y datos de keypoints.
- Modo simulación para desarrollo sin hardware de captura.
- Soporte para definir gestos personalizados y exportar logs para reentrenamiento.

## Gestos soportados (ejemplos)
- Swipe (izquierda/derecha/arriba/abajo)
- Tap / Double tap
- Pinch (acercar/alejar)
- Rotate (rotación con dos dedos o manos)
- Hold / Press prolongado
- Pointing / Señalización con dedo
- Gestos compuestos (secuencias de gestos)
- Gestos personalizados definidos por el usuario

## Tecnologías (orientativo)
- Lenguaje: JavaScript / TypeScript (runtime principal).
- Modelos y extracción de keypoints: MediaPipe, TensorFlow.js, o wrappers sobre OpenCV.
- Infraestructura: Node.js para herramientas y scripts, bundlers como Vite/Rollup.
- Testing: Jest para unit tests; entornos de CI para integración continua.
- Opcional: WebAssembly para acelerar procesamiento crítico.

## Arquitectura (visión general)
La arquitectura está organizada en capas para maximizar modularidad y permitir reemplazar componentes sin afectar el resto:

1. Input Adapters
   - Abstraen la fuente de datos (WebCam, vídeo, touch).
   - Emiten frames o eventos crudos en un formato uniforme.

2. Preprocessing
   - Frame processor: normaliza tamaño, recorta ROI y aplica filtros.
   - Keypoint extractor: invoca modelos o detectores para devolver puntos articulares.
   - Temporal smoother: aplica filtros (media móvil, Kalman) para estabilidad.

3. Detection / Recognition
   - HeuristicDetector: reglas deterministas para gestos simples y bajos recursos.
   - MLClassifier: modelo que toma secuencias de keypoints y devuelve etiquetas y probabilidades.
   - GestureStateMachine: controla estados (idle, tracking, recognized) y evita rebotes.

4. Event API
   - Emitter central que publica `gestureStart`, `gestureUpdate`, `gestureEnd`.
   - Payload estándar: { id, type, confidence, keypoints, bbox, velocity, timestamps }.

5. Observability / Logging
   - Hooks para guardar trazas, métricas y datasets para reentrenamiento.
   - Opcional: exportación de secuencias en formato JSON/CSV.

## Flujo de datos (resumido)
Input (cámara/touch) → FrameProcessor → KeypointExtractor → TemporalSmoother → Detector/Classifier → StateMachine → Event API → Aplicación consumidora

Cada etapa añade metadatos útiles (timestamps, transformaciones aplicadas, coeficientes de confianza) para trazabilidad y debugging.

## Formato de eventos (ejemplo conceptual)
- gestureStart: inicia la detección de un gesto en curso.
- gestureUpdate: actualizaciones periódicas con posición y confianza.
- gestureEnd: finalización con resumen (duración, máxima confianza, path de keypoints).

Payload típico:
- id: identificador único del gesto en curso
- type: nombre del gesto reconocido
- confidence: número [0..1]
- keypoints: array de puntos {x, y, z?, score}
- bbox: {x, y, width, height} en coordenadas normalizadas
- velocity: vector de movimiento estimado
- timestamps: {start, last, end}

## Decisiones de diseño clave
- Separación estricta entre extracción de keypoints y lógica de reconocimiento para permitir cambiar el backend de visión sin tocar la lógica de negocio.
- Máquina de estados para debouncing y para soportar gestos compuestos o multi-step.
- Arquitectura orientada a eventos para integración sencilla con frameworks reactivos y motores 3D.
- Configurabilidad amplia: umbrales, ventanas temporales y estrategias de suavizado son parámetros ajustables.
- Modo offline para entrenar/depurar sin latencia de captura.

## Parámetros y configuración relevantes
- samplingRate: frecuencia de muestreo de frames para inferencia.
- smoothingWindow: tamaño de ventana para filtrado temporal.
- minConfidence: umbral mínimo para aceptar detección de keypoints.
- gestureDebounceMs: tiempo mínimo entre gestos reconocidos.
- maxSequenceLength: longitud máxima de secuencia alimentada al clasificador.
- inputResolution: resolución de procesamiento para equilibrar precisión y rendimiento.

## Rendimiento y optimización
- Preferir modelos ligeros (TF.js small / MediaPipe) en entornos limitados.
- Procesamiento selectivo: skip frames para reducir carga sin perder fluidez perceptual.
- Batch inference para GPUs o WebGPU cuando aplique.
- Usar WebAssembly o workers para offload del hilo principal en aplicaciones web.
- Perfilado continuo: medir latencias por etapa y priorizar optimizaciones donde haya mayor costo.

## Privacidad y ética
- Procesado local preferente: evitar enviar frames a servidores por defecto.
- Si se envían datos para reentrenamiento, anonimizar y pedir consentimiento explícito.
- Documentar exactamente qué datos se almacenan y durante cuánto tiempo.
- Soporte para modo "solo keypoints" donde no se guarda el frame original.

## Testing y validación
- Tests unitarios para transformaciones y lógica de máquina de estados.
- Tests de integración con data fixtures de keypoints reales o simulados.
- Validación de modelos: métricas de precisión, recall y F1 sobre conjuntos etiquetados.
- Pruebas de latencia end-to-end en dispositivos objetivo para asegurar experiencia en tiempo real.

## Extensibilidad
- Plugins para añadir nuevos extractores de keypoints o clasificadores.
- API para registrar nuevos gestos definidos por secuencias de keypoints o por ejemplos etiquetados.
- Exportadores de datasets para facilitar reentrenamiento externo.
- Hooks para integrar con frameworks (p. ej. react hooks, bindings nativos) sin acoplar la librería a un framework específico.
