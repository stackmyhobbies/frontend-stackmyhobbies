import * as z from 'zod'
import { SegmentType, SegmentTypeValues } from '../enum/segmentType.enum'
import { SubSegmentType, SubSegmentTypeValues } from '../enum/subSegmentType.enum'
import { ProgressUnit, ProgressUnitValues } from '../enum/progressUnit.enum'
import { DayOfWeek, DayOfWeekValues } from '../enum/dayOfWeek.enum'

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png']
const MAX_IMAGE_SIZE = 2 * 1024 * 1024 // 2MB

// Validador manual para fechas (Zod 4 eliminó .date() sobre string)
const dateString = z.string().refine((val) => !val || !isNaN(Date.parse(val)), {
  message: 'La fecha debe tener un formato válido',
})

// Definimos la función como genérica <T>
const validateValueInSet = <T>(val: unknown, fieldValues: T[]): T | null => {
  if (val === null || val === undefined) return null

  // Verificamos si el valor está incluido en el array de valores permitidos
  if (typeof val === 'string' && (fieldValues as unknown as string[]).includes(val)) {
    return val as unknown as T
  }

  return null
}

// Ahora tus validadores específicos sí retornan el valor
const validatedSegmentType = (val: unknown) => {
  return validateValueInSet(val, SegmentTypeValues)
}

const validatedDayOfWeek = (val: unknown) => {
  return validateValueInSet(val, DayOfWeekValues)
}

const BaseContentItem = z.object({
  title: z
    .string({
      required_error: 'El título es obligatorio',
      invalid_type_error: 'El titulo debe ser un texto',
    })
    .min(1, { message: 'El título es obligatorio' }),

  description: z.string().default(''),
  notes: z.string().default(''),

  image: z
    .union([z.instanceof(File), z.null()])
    .optional()
    .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: 'Solo se permiten imágenes JPEG, JPG y PNG',
    })
    .refine((file) => !file || file.size <= MAX_IMAGE_SIZE, {
      message: 'La imagen no debe superar los 2MB',
    }),

  content_type_id: z.preprocess(
    (val) => (val === null ? null : Number(val)),
    z.number({
      required_error: 'El tipo de contenido es obligatorio',
      invalid_type_error: 'Selecciona un tipo de contenido valido',
    }),
  ) as z.ZodType<number | null>,

  progress_status_id: z
    .number({
      required_error: 'El estado de progreso es obligatorio',
      invalid_type_error: 'Selecciona un tipo de contenido',
    })
    .default(1),

  current_progress: z.coerce
    .number()
    .min(1, { message: 'El progreso actual debe ser mayor o igual a 1' })
    .default(1),
  total_progress: z.coerce
    .number()
    .min(1, { message: 'El progreso total debe ser mayor o igual a 1' })
    .default(1),

  progress_unit: z.enum(ProgressUnitValues, {
    required_error: 'La unidad de progreso es obligatoria',
    invalid_type_error: 'Selecciona un tipo de unidad de progreso',
  }),

  day_of_week: z.preprocess(
    (val) => validatedDayOfWeek(val),
    z
      .enum(DayOfWeekValues, {
        required_error: 'El día de la semana es obligatorio',
        invalid_type_error: 'Selecciona un dia de la semana',
      })
      .nullable() /**Pendiente validar si es null */,
  ) as z.ZodType<DayOfWeek | null>,

  segment_type: z.preprocess(
    (val) => validatedSegmentType(val),
    z.enum(SegmentTypeValues, { invalid_type_error: 'Selecciona un tipo de segmento' }),
  ) as z.ZodType<SegmentType | null>,

  segment_number: z.coerce
    .number({
      invalid_type_error: 'El número del segmento debe ser un número',
    })
    .min(1, { message: 'El número del segmento debe ser mayor o igual a 1' }),
  segment_subtype: z.enum(SubSegmentTypeValues).nullable().optional(),
  segment_subnumber: z.number().default(0).nullable().optional(),

  start_date: dateString.optional().or(z.literal('')),
  end_date: dateString.optional().or(z.literal('')),

  rating: z.number().min(0).max(5),

  tags: z
    .array(z.object({ id: z.number(), name: z.string(), slug: z.string(), status: z.boolean() }))
    .default([]),
})

export const CreateContentItem = BaseContentItem

export const UpdateContentItem = BaseContentItem.partial()
