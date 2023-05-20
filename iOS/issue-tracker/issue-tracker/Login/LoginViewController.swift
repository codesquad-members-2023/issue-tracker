//
//  ViewController.swift
//  issue-tracker
//
//  Created by SONG on 2023/05/09.
//

import UIKit

class LoginViewController: UIViewController {
    @IBOutlet var button: UIButton!
    override func viewDidLoad() {
        super.viewDidLoad()
        button.addTarget(self, action: #selector(buttonTapped), for: .touchUpInside)
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        navigationController?.setNavigationBarHidden(true, animated: false)
    }
    
    @objc func buttonTapped() {
        let homeViewStoryboard = UIStoryboard(name: "HomeStoryboard", bundle: nil)
        let homeViewController = homeViewStoryboard.instantiateInitialViewController()!
        navigationController?.pushViewController(homeViewController, animated: true)
    }
}
