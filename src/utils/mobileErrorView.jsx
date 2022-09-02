import React from 'react'
import { ExclamationIcon } from '@heroicons/react/outline'

const MobileErrorView = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-firstBg text-center">
      <ExclamationIcon className="w-24 text-grayColor" />
      <h1 className="text-xl font-bold text-white my-4">
        Página no disponible
      </h1>
      <p className="text-sm font-normal text-grayColor px-4">
        Esta página no está disponible en dispositivos móviles, por favor acceda
        desde una computadora
      </p>
    </div>
  )
}

export default MobileErrorView
