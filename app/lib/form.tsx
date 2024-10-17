// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validationErrorsForField(fetcher: any, fieldName: string) {
  if (fetcher.data?.name !== 'ValidationError') {
    return null
  }

  return (
    <p role="alert" className="text-sm text-red-600">
      {fetcher.data.formErrors.fieldErrors[fieldName]?.join(', ')}
    </p>
  )
}
