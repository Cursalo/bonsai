'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

// Mock data for the bonsai tree with 8 branches
const mockTreeData = {
  trunk: {
    health: 0.85,
    growth: 0.8,
  },
  branches: [
    {
      id: 'b1',
      name: 'Algebra',
      subject: 'SAT Math',
      growth: 0.9,
      health: 0.9,
      angle: -60,
      concepts: [
        { id: 'c1', name: 'Linear Equations', mastery: 0.95 },
        { id: 'c2', name: 'Quadratic Equations', mastery: 0.85 },
      ],
    },
    {
      id: 'b2',
      name: 'Geometry',
      subject: 'SAT Math',
      growth: 0.8,
      health: 0.85,
      angle: -30,
      concepts: [
        { id: 'c3', name: 'Triangles', mastery: 0.8 },
        { id: 'c4', name: 'Circles', mastery: 0.7 },
      ],
    },
    {
      id: 'b3',
      name: 'Statistics',
      subject: 'SAT Math',
      growth: 0.7,
      health: 0.75,
      angle: 0,
      concepts: [
        { id: 'c5', name: 'Data Analysis', mastery: 0.75 },
        { id: 'c6', name: 'Probability', mastery: 0.65 },
      ],
    },
    {
      id: 'b4',
      name: 'Reading Comprehension',
      subject: 'SAT Reading',
      growth: 0.85,
      health: 0.8,
      angle: 30,
      concepts: [
        { id: 'c7', name: 'Main Ideas', mastery: 0.8 },
        { id: 'c8', name: 'Supporting Details', mastery: 0.75 },
      ],
    },
    {
      id: 'b5',
      name: 'Vocabulary',
      subject: 'SAT Reading',
      growth: 0.7,
      health: 0.75,
      angle: 60,
      concepts: [
        { id: 'c9', name: 'Context Clues', mastery: 0.7 },
        { id: 'c10', name: 'Word Meanings', mastery: 0.65 },
      ],
    },
    {
      id: 'b6',
      name: 'Grammar',
      subject: 'SAT Writing',
      growth: 0.75,
      health: 0.7,
      angle: 90,
      concepts: [
        { id: 'c11', name: 'Punctuation', mastery: 0.7 },
        { id: 'c12', name: 'Sentence Structure', mastery: 0.65 },
      ],
    },
    {
      id: 'b7',
      name: 'Essay Structure',
      subject: 'SAT Writing',
      growth: 0.65,
      health: 0.6,
      angle: 120,
      concepts: [
        { id: 'c13', name: 'Thesis Development', mastery: 0.6 },
        { id: 'c14', name: 'Evidence Use', mastery: 0.55 },
      ],
    },
    {
      id: 'b8',
      name: 'PSAT Prep',
      subject: 'PSAT',
      growth: 0.6,
      health: 0.55,
      angle: 150,
      concepts: [
        { id: 'c15', name: 'Test Strategy', mastery: 0.55 },
        { id: 'c16', name: 'Time Management', mastery: 0.5 },
      ],
    },
  ],
}

// Color mapping for different subjects
const subjectColors = {
  'SAT Math': '#4ade80', // green
  'SAT Reading': '#60a5fa', // blue
  'SAT Writing': '#c084fc', // purple
  'PSAT': '#f97316', // orange
}

export default function BonsaiTreeVisualization() {
  const [treeData, setTreeData] = useState(mockTreeData)
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null)
  const [visibleBranches, setVisibleBranches] = useState<string[]>([])
  const [visibleLeaves, setVisibleLeaves] = useState<string[]>([])

  // SVG dimensions
  const svgWidth = 1020
  const svgHeight = 850
  const centerX = svgWidth / 2
  const centerY = svgHeight - 85
  const trunkHeight = 204
  const trunkWidth = 42.5

  // Calculate branch and leaf positions
  useEffect(() => {
    // Start with no branches or leaves
    setVisibleBranches([])
    setVisibleLeaves([])
    
    // Add branches progressively
    const branchTimer = setTimeout(() => {
      const branches = treeData.branches.map(branch => branch.id)
      setVisibleBranches(branches)
    }, 500)
    
    // Add leaves progressively
    const leafTimer = setTimeout(() => {
      const leaves: string[] = []
      treeData.branches.forEach(branch => {
        branch.concepts.forEach(concept => {
          if (concept.mastery > 0.3) leaves.push(concept.id)
        })
      })
      setVisibleLeaves(leaves)
    }, 1500)
    
    return () => {
      clearTimeout(branchTimer)
      clearTimeout(leafTimer)
    }
  }, [treeData])

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <svg 
        width="100%" 
        height="100%" 
        viewBox={`0 0 ${svgWidth} ${svgHeight}`} 
        className="max-w-full max-h-full"
        style={{ overflow: 'visible' }}
      >
        {/* Ground/Pot */}
        <motion.ellipse
          cx={centerX}
          cy={centerY + 10}
          rx={trunkWidth * 3}
          ry={trunkWidth / 2}
          fill="#8B4513"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Trunk */}
        <motion.path
          d={`
            M ${centerX - trunkWidth / 2} ${centerY}
            C ${centerX - trunkWidth} ${centerY - trunkHeight / 3} ${centerX - trunkWidth / 3} ${centerY - trunkHeight / 2} ${centerX - trunkWidth / 4} ${centerY - trunkHeight}
            L ${centerX + trunkWidth / 4} ${centerY - trunkHeight}
            C ${centerX + trunkWidth / 3} ${centerY - trunkHeight / 2} ${centerX + trunkWidth} ${centerY - trunkHeight / 3} ${centerX + trunkWidth / 2} ${centerY}
            Z
          `}
          fill="#8B4513"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        
        {/* Branches */}
        {treeData.branches.map((branch, index) => {
          if (!visibleBranches.includes(branch.id)) return null;
          
          // Calculate branch parameters
          const branchLength = 102 + branch.growth * 102
          const startY = centerY - trunkHeight + 34
          const radians = (branch.angle * Math.PI) / 180
          const endX = centerX + Math.sin(radians) * branchLength
          const endY = startY - Math.cos(radians) * branchLength
          const controlX1 = centerX + Math.sin(radians) * branchLength * 0.3
          const controlY1 = startY - Math.cos(radians) * branchLength * 0.3
          const controlX2 = centerX + Math.sin(radians) * branchLength * 0.7
          const controlY2 = startY - Math.cos(radians) * branchLength * 0.7
          const branchColor = subjectColors[branch.subject as keyof typeof subjectColors] || '#6b7280'
          const branchWidth = 6.8 + branch.health * 5.1
          
          return (
            <g key={branch.id}>
              {/* Branch */}
              <motion.path
                d={`M ${centerX} ${startY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${endX} ${endY}`}
                stroke={branchColor}
                strokeWidth={branchWidth}
                fill="transparent"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                onMouseEnter={() => setActiveTooltip(branch.id)}
                onMouseLeave={() => setActiveTooltip(null)}
              />
              
              {/* Leaves */}
              {branch.concepts.map((concept, cIndex) => {
                if (!visibleLeaves.includes(concept.id)) return null;
                
                // Calculate position along the branch
                const leafDistance = 0.6 + (cIndex * 0.2)
                const t = leafDistance // Parameter along the curve (0 to 1)
                const mt = 1 - t
                
                // Position on the cubic Bezier curve
                const leafX = mt*mt*mt*centerX + 3*mt*mt*t*controlX1 + 3*mt*t*t*controlX2 + t*t*t*endX
                const leafY = mt*mt*mt*startY + 3*mt*mt*t*controlY1 + 3*mt*t*t*controlY2 + t*t*t*endY
                
                // Add some randomness to leaf position
                const offsetX = (Math.random() - 0.5) * 15
                const offsetY = (Math.random() - 0.5) * 15
                
                // Calculate leaf size based on mastery
                const leafSize = 20.4 + concept.mastery * 25.5
                
                // Create a leaf shape
                const leafPath = createLeafPath(leafX + offsetX, leafY + offsetY, leafSize, branch.angle + (cIndex % 2 ? 30 : -30))
                
                return (
                  <motion.g
                    key={concept.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.5 + index * 0.2 + cIndex * 0.1 }}
                    onMouseEnter={() => setActiveTooltip(concept.id)}
                    onMouseLeave={() => setActiveTooltip(null)}
                  >
                    <path
                      d={leafPath}
                      fill={branchColor}
                      opacity={0.9}
                      stroke={branchColor}
                      strokeWidth={1}
                    />
                    
                    {/* Tooltip for concept */}
                    {activeTooltip === concept.id && (
                      <foreignObject x={leafX + offsetX - 80} y={leafY + offsetY - 60} width={160} height={60}>
                        <div className="bg-white dark:bg-gray-800 p-2 rounded shadow-lg text-xs whitespace-nowrap">
                          <p className="font-bold">{concept.name}</p>
                          <p>Subject: {branch.name}</p>
                          <p>Mastery: {Math.round(concept.mastery * 100)}%</p>
                        </div>
                      </foreignObject>
                    )}
                  </motion.g>
                )
              })}
              
              {/* Tooltip for branch */}
              {activeTooltip === branch.id && (
                <foreignObject x={endX - 80} y={endY - 60} width={160} height={60}>
                  <div className="bg-white dark:bg-gray-800 p-2 rounded shadow-lg text-xs">
                    <p className="font-bold">{branch.name}</p>
                    <p>Subject: {branch.subject}</p>
                    <p>Mastery: {Math.round(branch.health * 100)}%</p>
                  </div>
                </foreignObject>
              )}
            </g>
          )
        })}
      </svg>
      
      {/* Legend */}
      <div className="absolute bottom-2 right-2 bg-white dark:bg-gray-800 p-2 rounded shadow-sm text-xs">
        {Object.entries(subjectColors).map(([subject, color]) => (
          <div key={subject} className="flex items-center mt-1">
            <div className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: color }}></div>
            <span>{subject}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Function to create a leaf path
function createLeafPath(x: number, y: number, size: number, angle: number) {
  // Convert angle to radians
  const rad = (angle * Math.PI) / 180
  
  // Calculate rotated control points for the leaf
  const rotate = (px: number, py: number) => {
    const rx = Math.cos(rad) * (px - x) - Math.sin(rad) * (py - y) + x
    const ry = Math.sin(rad) * (px - x) + Math.cos(rad) * (py - y) + y
    return { x: rx, y: ry }
  }
  
  // Leaf shape control points (unrotated)
  const tip = { x: x, y: y - size }
  const leftCtrl1 = { x: x - size * 0.5, y: y - size * 0.5 }
  const leftCtrl2 = { x: x - size * 0.8, y: y - size * 0.2 }
  const rightCtrl1 = { x: x + size * 0.5, y: y - size * 0.5 }
  const rightCtrl2 = { x: x + size * 0.8, y: y - size * 0.2 }
  
  // Rotate all points
  const rotTip = rotate(tip.x, tip.y)
  const rotLeftCtrl1 = rotate(leftCtrl1.x, leftCtrl1.y)
  const rotLeftCtrl2 = rotate(leftCtrl2.x, leftCtrl2.y)
  const rotRightCtrl1 = rotate(rightCtrl1.x, rightCtrl1.y)
  const rotRightCtrl2 = rotate(rightCtrl2.x, rightCtrl2.y)
  
  // Create the path
  return `
    M ${x} ${y}
    C ${rotLeftCtrl2.x} ${rotLeftCtrl2.y}, ${rotLeftCtrl1.x} ${rotLeftCtrl1.y}, ${rotTip.x} ${rotTip.y}
    C ${rotRightCtrl1.x} ${rotRightCtrl1.y}, ${rotRightCtrl2.x} ${rotRightCtrl2.y}, ${x} ${y}
    Z
  `
} 