import React from 'react';
import { Apartment, ApartmentDataByDate } from '../pages/MapPage';

interface DetailPanelProps {
    apartment: Apartment;
    apartmentData: ApartmentDataByDate;
    onClose: () => void;
}

const DetailPanel: React.FC<DetailPanelProps> = ({
    apartment,
    apartmentData,
    onClose,
}) => {
    // Prepare chart data (Dynamic)
    const dates = Object.keys(apartmentData).sort();
    // Get all unique price types across all dates for this apartment
    const allPriceTypes = Array.from(new Set(dates.flatMap(date =>
        apartmentData[date]?.find(a => a.id === apartment.id)?.price
            ? Object.keys(apartmentData[date]!.find(a => a.id === apartment.id)!.price)
            : []
    )));

    // Helper to safely get price as number
    const getPrice = (date: string, type: string) => {
        const apt = apartmentData[date]?.find((a) => a.id === apartment.id);
        const priceStr = apt?.price?.[type as keyof typeof apt.price];
        if (!priceStr) return 0;
        // Extract number from string like "14억" -> 14
        const match = priceStr.match(/(\d+(\.\d+)?)/);
        return match ? parseFloat(match[0]) : 0;
    };

    const dataPointsByType: { [key: string]: number[] } = {};
    allPriceTypes.forEach(type => {
        dataPointsByType[type] = dates.map(date => getPrice(date, type));
    });

    const allValues = Object.values(dataPointsByType).flat();
    const maxPrice = Math.max(...allValues, 1);
    const minPrice = Math.min(...allValues.filter(p => p > 0)) * 0.8;

    // Simple SVG Line Chart
    const Chart = () => {
        const width = 300;
        const height = 150;
        const padding = 20;

        const getX = (index: number) => padding + (index / (dates.length - 1 || 1)) * (width - 2 * padding);
        const getY = (price: number) => height - padding - ((price - minPrice) / (maxPrice - minPrice || 1)) * (height - 2 * padding);

        const createPath = (data: number[]) => {
            return data.map((price, i) =>
                price > 0 ? `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(price)}` : ''
            ).filter(Boolean).join(' ');
        };

        const colors = ['#38bdf8', '#2dd4bf', '#818cf8', '#f472b6', '#fbbf24']; // Sky, Teal, Indigo, Pink, Amber

        return (
            <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
                {/* Grid lines */}
                <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="rgba(255,255,255,0.1)" />
                <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="rgba(255,255,255,0.1)" />

                {allPriceTypes.map((type, index) => {
                    const color = colors[index % colors.length];
                    const data = dataPointsByType[type] || [];
                    return (
                        <g key={type}>
                            <path d={createPath(data)} fill="none" stroke={color} strokeWidth="2" />
                            {data.map((p, i) => p > 0 && (
                                <circle key={`${type}-${i}`} cx={getX(i)} cy={getY(p)} r="3" fill={color} />
                            ))}
                        </g>
                    );
                })}
            </svg>
        );
    };

    return (
        <div className="absolute top-4 right-4 bottom-4 w-96 z-50 flex flex-col pointer-events-none">
            <div className="glass-panel rounded-2xl p-6 h-full overflow-y-auto text-white relative pointer-events-auto">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                <div className="mb-6">
                    <span className="inline-block px-2 py-1 rounded text-xs font-bold bg-blue-500/20 text-blue-300 mb-2 border border-blue-500/30">
                        {apartment.category}
                    </span>
                    <h2 className="text-2xl font-bold mb-1 text-neon-blue">
                        {apartment.name}
                    </h2>
                    <p className="text-gray-400 text-sm">{apartment.address}</p>
                </div>

                <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-3 border-b border-white/10 pb-2">
                        가격 정보
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        {Object.keys(apartment.price).map((key, index) => {
                            const colors = ['text-sky-400', 'text-teal-400', 'text-indigo-400', 'text-pink-400', 'text-amber-400'];
                            const colorClass = colors[index % colors.length];
                            return (
                                <div key={key} className="bg-white/5 p-3 rounded-lg border border-white/5">
                                    <span className="text-gray-400 text-sm block mb-1">{key}형</span>
                                    <span className={`text-xl font-bold ${colorClass}`}>
                                        {apartment.price[key as keyof typeof apartment.price] || '-'}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-3 border-b border-white/10 pb-2">
                        가격 추이
                    </h3>
                    <div className="bg-white/5 p-4 rounded-lg border border-white/5 h-48">
                        <Chart />
                        <div className="flex justify-center gap-4 mt-2 text-xs text-gray-400 flex-wrap">
                            {allPriceTypes.map((type, index) => {
                                const colors = ['bg-sky-400', 'bg-teal-400', 'bg-indigo-400', 'bg-pink-400', 'bg-amber-400'];
                                const colorClass = colors[index % colors.length];
                                return (
                                    <div key={type} className="flex items-center">
                                        <div className={`w-2 h-2 rounded-full ${colorClass} mr-1`}></div>
                                        {type}형
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-3 border-b border-white/10 pb-2">
                        상세 설명
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-sm">
                        {apartment.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DetailPanel;
