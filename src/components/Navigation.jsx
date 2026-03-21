import useCalculatorStore from '../store/calculatorStore';
import {
  IconLoan, IconCompound, IconSalary, IconSavings, IconStock,
} from './Icons';

const TABS = [
  { id: 'loan',     Icon: IconLoan,     label: '대출이자' },
  { id: 'compound', Icon: IconCompound, label: '복리수익' },
  { id: 'salary',   Icon: IconSalary,   label: '연봉실수령' },
  { id: 'savings',  Icon: IconSavings,  label: '예적금' },
  { id: 'stock',    Icon: IconStock,    label: '물타기' },
];

export default function Navigation() {
  const activeTab   = useCalculatorStore((s) => s.activeTab);
  const setActiveTab = useCalculatorStore((s) => s.setActiveTab);

  return (
    <nav className="nav-scroll">
      {TABS.map(({ id, Icon, label }) => {
        const isActive = activeTab === id;
        return (
          <button
            key={id}
            className={`nav-tab ${isActive ? 'active' : ''}`}
            onClick={() => setActiveTab(id)}
          >
            <span className="nav-tab-icon">
              <Icon size={22} />
            </span>
            <span className="nav-tab-label">{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
