import UIKit

protocol CustomNaviDelegate: AnyObject {
    func cancelButtonTapped()
    func saveButtonTapped()
}

class CustomNaviFilter: UIView {
    weak var delegate: CustomNaviDelegate?
    
    private lazy var cancelButton: UIButton = {
        let button = UIButton()
        button.setTitle("< 취소", for: .normal)
        button.setTitleColor(UIColor(red: 0, green: 122/255, blue: 255/255, alpha: 1), for: .normal)
        button.titleLabel?.font = UIFont(name: "SFProDisplay-Semibold", size: 18)
        button.addTarget(self, action: #selector(cancelButtonTapped), for: .touchUpInside)
        return button
    }()
    
    private lazy var saveButton: UIButton = {
        let button = UIButton()
        button.setTitle("저장", for: .normal)
        button.setTitleColor(UIColor(red: 0, green: 122/255, blue: 255/255, alpha: 1), for: .normal)
        button.titleLabel?.font = UIFont(name: "SFProDisplay-Semibold", size: 18)
        button.addTarget(self, action: #selector(saveButtonTapped), for: .touchUpInside)
        return button
    }()
    
    private lazy var filterLabel: UILabel = {
        let label = UILabel()
        label.text = "필터"
        label.font = UIFont(name: "SFProDisplay-Semibold", size: 18)
        return label
    }()
   
    override init(frame: CGRect) {
        super .init(frame: frame)
        self.backgroundColor = UIColor(red: 0.95, green: 0.95, blue: 0.97, alpha: 1.0)
        layout()
    }
    
    func layout() {
        [self.cancelButton, self.filterLabel, self.saveButton].forEach {
            self.addSubview($0)
            $0.translatesAutoresizingMaskIntoConstraints = false
        }
        
        NSLayoutConstraint.activate([
            cancelButton.leadingAnchor.constraint(equalTo: self.leadingAnchor, constant: 16),
            cancelButton.bottomAnchor.constraint(equalTo: self.bottomAnchor, constant: -10),
            
            saveButton.trailingAnchor.constraint(equalTo: self.trailingAnchor, constant: -16),
            saveButton.bottomAnchor.constraint(equalTo: self.bottomAnchor, constant: -10),
            
            filterLabel.centerXAnchor.constraint(equalTo: self.centerXAnchor),
            filterLabel.bottomAnchor.constraint(equalTo: self.bottomAnchor, constant: -17)
        ])
    }
    
    @objc func cancelButtonTapped() {
        delegate?.cancelButtonTapped()
    }
    
    @objc func saveButtonTapped() {
        delegate?.saveButtonTapped()
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
}
