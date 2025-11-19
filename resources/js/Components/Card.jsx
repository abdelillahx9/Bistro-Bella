export default function Card({ title, value }) {
    return (
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-900 mb-2">{title}</h3>
            <div className="text-3xl font-bold text-gray-900">{value}</div>
        </div>
    );
}