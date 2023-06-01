//
//  AddtionalInfoTableViewController.swift
//  issue-tracker
//
//  Created by SONG on 2023/06/01.
//

import UIKit

class AddtionalInfoTableViewController: UITableViewController {
    private var additionalInfoPiece : [Codable] = []
    
    override func viewDidLoad() {
        super.viewDidLoad()
        registerCell()
        setNavigationItem()
    }
    
    func configure(with info : [Codable]) {
        additionalInfoPiece = info
    }
    
    private func setNavigationItem() {
        navigationItem.leftBarButtonItem = UIBarButtonItem(title: "저장", style: .plain, target: self, action: #selector(saveButtonTouched))
    }
    
    @objc private func saveButtonTouched() {
        navigationController?.popViewController(animated: true)
    }
    
    private func registerCell() {
        tableView.register(UINib(nibName: "IssueFilterTableViewCell", bundle: nil), forCellReuseIdentifier: "filterOptionCell")
    }

    override func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return additionalInfoPiece.count
    }

    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        guard let cell = tableView.dequeueReusableCell(withIdentifier: "filterOptionCell", for: indexPath) as? IssueFilterTableViewCell else {
            return UITableViewCell()
        }
        if let unit = additionalInfoPiece[indexPath.row] as? User {
            cell.filterOptionLabel.text = unit.id
        }
        else if let label = additionalInfoPiece[indexPath.row] as? Label {
            cell.filterOptionLabel.text = label.name
        }
        else if let milestone = additionalInfoPiece[indexPath.row] as? Milestone {
            cell.filterOptionLabel.text = milestone.name
        }
        return cell
    }
}
