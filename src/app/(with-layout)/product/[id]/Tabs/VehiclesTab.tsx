"use client"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface FitVehicle {
  id: string
  engine: {
    engineCode: string
    hp: number
    ccm: number
    fuelType: string
    generation: {
      generationName: string
      body: string
      productionStart: string
      productionEnd: string | null
      model: {
        modelName: string
        brand: { brandName: string }
      }
    }
  }
}

interface VehiclesTabProps {
  fitVehicles: FitVehicle[]
}

export default function VehiclesTab({ fitVehicles }: VehiclesTabProps) {
  const [expandedManufacturer, setExpandedManufacturer] = useState<Set<string>>(new Set())
  const [expandedModel, setExpandedModel] = useState<Set<string>>(new Set())

  const toggleManufacturer = (manufacturer: string) => {
    const newSet = new Set(expandedManufacturer)
    if (newSet.has(manufacturer)) newSet.delete(manufacturer)
    else newSet.add(manufacturer)
    setExpandedManufacturer(newSet)
  }

  const toggleModel = (modelKey: string) => {
    const newSet = new Set(expandedModel)
    if (newSet.has(modelKey)) newSet.delete(modelKey)
    else newSet.add(modelKey)
    setExpandedModel(newSet)
  }

  // Group by manufacturer
  const grouped: Record<string, FitVehicle[]> = {}
  fitVehicles.forEach((v) => {
    const brand = v.engine.generation.model.brand.brandName
    if (!grouped[brand]) grouped[brand] = []
    grouped[brand].push(v)
  })

  // Group by model within each manufacturer
  const getModelGroups = (vehicles: FitVehicle[]) => {
    const modelGroups: Record<string, FitVehicle[]> = {}
    vehicles.forEach((v) => {
      const modelName = v.engine.generation.model.modelName
      if (!modelGroups[modelName]) modelGroups[modelName] = []
      modelGroups[modelName].push(v)
    })
    return modelGroups
  }

  const getYearRange = (vehicles: FitVehicle[]) => {
    const years = vehicles.map((v) => {
      const start = new Date(v.engine.generation.productionStart).getFullYear()
      const end = v.engine.generation.productionEnd ? new Date(v.engine.generation.productionEnd).getFullYear() : null
      return { start, end }
    })
    const minYear = Math.min(...years.map((y) => y.start))
    const maxYear = Math.max(...years.map((y) => y.end || y.start))
    return `${minYear} - ${maxYear}`
  }

  const getKW = (hp: number) => {
    return Math.round(hp * 0.7457 * 10) / 10
  }

  return (
    <div className="mt-8">
      <h2 className="mb-6 text-lg font-semibold text-foreground">Fit Vehicles</h2>
      <div className="space-y-0">
        {Object.entries(grouped).map(([manufacturer, vehicles]) => {
          const modelGroups = getModelGroups(vehicles)
          const isManufacturerExpanded = expandedManufacturer.has(manufacturer)

          return (
            <div key={manufacturer} className="border border-gray-200">
              <button
                onClick={() => toggleManufacturer(manufacturer)}
                className="flex w-full items-center justify-between px-6 py-4 text-left  transition-colors"
              >
                <span className="font-semibold text-gray-900 dark:text-white ">{manufacturer}</span>
                <div className="flex items-center gap-4">
                  <span className="text-gray-600">
                    {vehicles.length} vehicle{vehicles.length !== 1 ? "s" : ""}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`text-gray-400 transition-transform ${isManufacturerExpanded ? "rotate-180" : ""}`}
                  />
                </div>
              </button>

              {isManufacturerExpanded &&
                Object.entries(modelGroups).map(([modelName, modelVehicles]) => {
                  const modelKey = `${manufacturer}-${modelName}`
                  const isModelExpanded = expandedModel.has(modelKey)
                  const yearRange = getYearRange(modelVehicles)

                  return (
                    <div key={modelKey} className="border-t border-gray-200">
                      {/* Model header */}
                      <button
                        onClick={() => toggleModel(modelKey)}
                        className="flex w-full items-center justify-between px-6 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <span className="text-gray-700 font-medium">{modelName}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-gray-600 text-sm">{yearRange}</span>
                          <ChevronDown
                            size={20}
                            className={`text-gray-400 transition-transform ${isModelExpanded ? "rotate-180" : ""}`}
                          />
                        </div>
                      </button>

                      {isModelExpanded && (
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-t border-gray-200 bg-white">
                                <th className="px-6 py-3 text-left font-semibold text-gray-900">Body</th>
                                <th className="px-6 py-3 text-left font-semibold text-gray-900">Model</th>
                                <th className="px-6 py-3 text-left font-semibold text-gray-900">Produced</th>
                                <th className="px-6 py-3 text-right font-semibold text-gray-900">KW</th>
                                <th className="px-6 py-3 text-right font-semibold text-gray-900">HP</th>
                                <th className="px-6 py-3 text-right font-semibold text-gray-900">CCM</th>
                              </tr>
                            </thead>
                            <tbody>
                              {modelVehicles.map((v, idx) => {
                                const { engine } = v
                                const { generation } = engine
                                const startDate = new Date(generation.productionStart)
                                const endDate = generation.productionEnd ? new Date(generation.productionEnd) : null
                                const startYear = startDate.getFullYear()
                                const startMonth = String(startDate.getMonth() + 1).padStart(2, "0")
                                const endYear = endDate ? endDate.getFullYear() : "..."
                                const endMonth = endDate ? String(endDate.getMonth() + 1).padStart(2, "0") : ""
                                const producedRange = endDate
                                  ? `${startYear}-${startMonth} - ${endYear}-${endMonth}`
                                  : `${startYear}-${startMonth} - ...`
                                const kw = getKW(engine.hp)

                                return (
                                  <tr
                                    key={v.id}
                                    className={`border-t border-gray-200 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                                  >
                                    <td className="px-6 py-3 text-gray-700">{generation.body}</td>
                                    <td className="px-6 py-3 text-gray-700">{engine.engineCode}</td>
                                    <td className="px-6 py-3 text-gray-700">{producedRange}</td>
                                    <td className="px-6 py-3 text-right text-gray-700">{kw}</td>
                                    <td className="px-6 py-3 text-right text-gray-700">{engine.hp}</td>
                                    <td className="px-6 py-3 text-right text-gray-700">{engine.ccm}</td>
                                  </tr>
                                )
                              })}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  )
                })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
