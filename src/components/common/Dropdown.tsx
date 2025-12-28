import React, { useState, useRef, useEffect } from 'react'
import { cn } from '../../utils/cn'

interface DropdownItem {
  label: string
  icon?: React.ReactNode
  onClick?: () => void
  href?: string
  type?: 'item' | 'divider'
  variant?: 'default' | 'danger'
}

interface DropdownProps {
  trigger: React.ReactNode
  items: DropdownItem[]
  align?: 'left' | 'right'
  className?: string
}

const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  items,
  align = 'right',
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleItemClick = (item: DropdownItem) => {
    if (item.onClick) {
      item.onClick()
    }
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>

      {isOpen && (
        <div
          className={cn(
            'absolute mt-2 min-w-[200px] rounded-md border bg-white shadow-lg z-50',
            align === 'right' ? 'right-0' : 'left-0',
            className
          )}
        >
          <div className="py-1">
            {items.map((item, index) => (
              <React.Fragment key={index}>
                {item.type === 'divider' ? (
                  <div className="my-1 border-t" />
                ) : (
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleItemClick(item)
                    }}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2 text-sm transition-colors cursor-pointer',
                      item.variant === 'danger'
                        ? 'text-red-600 hover:bg-red-50'
                        : 'text-gray-700 hover:bg-gray-100'
                    )}
                  >
                    {item.icon && <span>{item.icon}</span>}
                    {item.label}
                  </a>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export { Dropdown }