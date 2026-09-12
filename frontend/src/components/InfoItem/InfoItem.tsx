import "./InfoItem.scss"

interface InfoItemProps {
    icon: string
    label: string
    value: string | number
}

const InfoItem = ({ icon, label, value }: InfoItemProps) => {
    return (
        <div className="info-item">
            <div className="info-item__label">
                <span className="info-item__icon">{icon}</span>
                {label}
            </div>
            <div className="info-item__value">{value}</div>
        </div>
    )
}

export default InfoItem 